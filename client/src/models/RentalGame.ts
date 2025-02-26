export interface RentalGame {
    _id: {
        _id: string;
        title: string;
        publisher: string;
        released: string;
        description: string;
        image: string;
        available: boolean;
    },
    returnDate: string;
  }