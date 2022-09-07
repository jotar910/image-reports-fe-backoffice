import { ReportListItemModel } from '@/models/report-list-item.model';

export class ReportListFactory {
  static mockReportListItems = (): ReportListItemModel[] => [
    {
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'NEW',
      evaluation: null,
      approval: null
    },
    {
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'EVALUATING',
      evaluation: null,
      approval: null
    },
    {
      name: 'Report',
      user: 'joao@mail.com',
      image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
      creationDate: 0,
      status: 'ERROR',
      evaluation: null,
      approval: null
    },
    {
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
      name: 'Report',
      user: 'joao@mail.com',
      image: '',
      creationDate: 0,
      status: 'NEW',
      evaluation: null,
      approval: null
    },
    {
      name: 'Loading',
      user: 'joao@mail.com',
      image: '',
      creationDate: 0,
      status: 'NEW',
      evaluation: null,
      approval: null
    }
  ];

  static emptyReportListItems = (size: number): ReportListItemModel[] =>
    Array(size).fill(ReportListFactory.emptyReportListItem());

  private static emptyReportListItem = (): ReportListItemModel => ({
    name: '',
    user: '',
    image: '',
    creationDate: 0,
    status: 'NEW',
    evaluation: null,
    approval: null
  });
}
