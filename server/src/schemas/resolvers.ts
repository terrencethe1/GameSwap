import { ObjectId } from "mongoose";
import { User, type UserDocument, type GameDocument, LibraryGame } from "../models/index.js";
import { signToken, AuthenticationError } from '../services/auth.js';
import dayjs from 'dayjs';

// Argument Types
interface LoginUserArgs {
    email: string;
    password: string;
}

interface NewUserArgs {
    username: string;
    email: string;
    password: string;
}

interface MyGamesArgs {
  _id: any;
  username: string;
}

interface SearchBarArgs {
  title: string;
}

const resolvers = {
  Query: {
      // get a single user by either his id or his username
      me: async (_parent: any, _args: MyGamesArgs, context: any): Promise<UserDocument | null> => {
        if (context.user) {
            const params = { id: context.user.id, username: context.user.username };
            return User.findOne({
              $or: [{ _id: params.id }, { username: params.username }],
          }).populate({ path: 'savedGames', populate: { path: '_id' } });
        };
        throw new AuthenticationError('Could not authenticate user.');
      },
      // Retrieve an array of all the games in the GameSwap Library
      gameSwapLibrary: async (_parent: any, _args: any): Promise<GameDocument[]> => {
        return LibraryGame.find();
      },
      // A query to search for a game in the Library based on title
      searchBar: async (_parent: any, searchArgs: SearchBarArgs): Promise<GameDocument[] | null> => {
        return LibraryGame.find(
          { title: { $regex: `${searchArgs.title}`, $options: 'i' } }
        );
      }
  },
  Mutation: {
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    loginUser: async (_parent: any, { email, password }: LoginUserArgs) => {
        // Find a user with the provided email
        const user = await User.findOne({ email });
      
        // If no user is found, throw an AuthenticationError
        if (!user) {
          throw new AuthenticationError('Could not authenticate user.');
        }
      
        // Check if the provided password is correct
        const correctPw = await user.isCorrectPassword(password);
      
        // If the password is incorrect, throw an AuthenticationError
        if (!correctPw) {
          throw new AuthenticationError('Could not authenticate user.');
        }
      
        // Sign a token with the user's information
        const token = signToken(user.username, user.email, user._id);
      
        // Return the token and the user
        return { token, user };
    },
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    addUser: async (_parent: any, { username, email, password }: NewUserArgs) => {
        const user = await User.create({ username, email, password });
      
        // Sign a token with the user's information
        const token = signToken(user.username, user.email, user._id);

        return { token, user };
    },
    // save a game to a user's `savedGames` field by adding it to the set (to prevent duplicates)
    saveGame: async (_parent: any, saveGameArgs: ObjectId, context: any) => {
        // Generate the returnDate 14 days into the future
        // const generateReturnDate = new Date(new Date().setDate(new Date().getDate() + 14));

        // Use dayjs to generate returnDate 14 days into the future
        const generateReturnDate = dayjs().add(14,'day').format(`MMM-DD-YYYY`);
      
        const rentalData = {
          _id: saveGameArgs,
          returnDate: generateReturnDate
        }

        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedGames: rentalData } },
            { new: true, runValidators: true }
          ).populate({ path: 'savedGames', populate: { path: '_id' } })
          if (!updatedUser) {
            throw new AuthenticationError(`Cannot add ${saveGameArgs}.`);
          };
          return updatedUser.savedGames;
        };
        throw new AuthenticationError('Cannot find context.');
    },
    // remove a game from `savedGames`
    removeGame: async (_parent: any, removeGameArgs: ObjectId, context: any) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: removeGameArgs } },
          { new: true }
        ).populate({ path: 'savedGames', populate: { path: '_id' } })
        if (!updatedUser) {
          throw new AuthenticationError('Cannot find saved game _id.');
        };
        return updatedUser.savedGames;
      };
      throw new AuthenticationError('Cannot find context.');
    },
  },
};

export default resolvers;