export interface ITransfer {
    content: [
        {
          account: {
            accountBusinessId: string,
            balanceInHundredScale: number,
            currency: string,
            id: number
          },
          amountInHundredScale: number,
          from: string,
          id: number,
          message: string,
          to: string,
          transferDateTime: {
            date: number,
            day: number,
            hours: number,
            minutes: number,
            month: number,
            nanos: number,
            seconds: number,
            time: number,
            timezoneOffset: number,
            year: number
          },
          transferType: string,
          zone: string
        }
      ],
      empty: boolean,
      first: boolean,
      last: boolean,
      number: number,
      numberOfElements: number,
      pageable: {
        offset: number,
        pageNumber: number,
        pageSize: number,
        paged: boolean,
        sort: {
          empty: boolean,
          sorted: boolean,
          unsorted: boolean
        },
        unpaged: boolean
      },
      size: number,
      sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
      },
      totalElements: number,
      totalPages: number
}