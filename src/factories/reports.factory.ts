import { ReportListItemModel } from '@/models/report-list-item.model';
import { ReportDetailsModel } from '@/models/report-details.model';

export class ReportsFactory {
  static mockReportDetails = (id = 1): ReportDetailsModel => ReportsFactory.mockReportsDetails()[id - 1];

  static mockReportsDetails = (): ReportDetailsModel[] => ReportsFactory.mockReportListItems()
    .map((item) => ({
      ...item,
      image: {
        src: item.image,
        size: 23_456_789,
        width: 1920,
        height: 1080
      }
    }));

  static mockReportListItems = (): ReportListItemModel[] => [
    {
      id: 1,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'NEW',
      evaluation: null,
      approval: null
    },
    {
      id: 2,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'EVALUATING',
      evaluation: null,
      approval: null
    },
    {
      id: 3,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'ERROR',
      evaluation: null,
      approval: null
    },
    {
      id: 4,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'PENDING',
      evaluation: {
        grade: 15,
        categories: ['violence', 'drugs', 'weapons']
      },
      approval: null
    },
    {
      id: 5,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'PENDING',
      evaluation: {
        grade: 15,
        categories: ['violence', 'drugs', 'weapons']
      },
      approval: null
    },
    {
      id: 6,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'PENDING',
      evaluation: {
        grade: 50,
        categories: ['weapons']
      },
      approval: null
    },
    {
      id: 7,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'PENDING',
      evaluation: {
        grade: 85,
        categories: []
      },
      approval: null
    },
    {
      id: 8,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'PUBLISHED',
      evaluation: {
        grade: 85,
        categories: []
      },
      approval: {
        user: 'You',
        status: 'APPROVED',
        date: 1
      }
    },
    {
      id: 9,
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'PUBLISHED',
      evaluation: {
        grade: 15,
        categories: []
      },
      approval: {
        user: 'other@email.com',
        status: 'REJECTED',
        date: 2
      }
    },
    {
      id: 10,
      name: 'Report',
      user: 'joao@mail.com',
      image: '',
      creationDate: 0,
      status: 'NEW',
      evaluation: null,
      approval: null
    },
    {
      id: 11,
      name: 'Loading',
      user: 'joao@mail.com',
      image: '',
      creationDate: 0,
      status: 'NEW',
      evaluation: null,
      approval: null
    }
  ];

  static emptyReportDetails = (): ReportDetailsModel => ({
    id: 0,
    name: '',
    user: '',
    image: {
      src: '',
      size: 0,
      width: 0,
      height: 0
    },
    creationDate: 0,
    status: 'NEW',
    evaluation: null,
    approval: null
  });

  static emptyReportListItems = (size: number): ReportListItemModel[] =>
    Array(size).fill(ReportsFactory.emptyReportListItem());

  private static emptyReportListItem = (): ReportListItemModel => ({
    id: 0,
    name: '',
    user: '',
    image: '',
    creationDate: 0,
    status: 'NEW',
    evaluation: null,
    approval: null
  });
}
