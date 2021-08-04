export default [
  {
    title: 'Dashboard',
    route: 'dashboard',
    icon: 'HomeIcon',
  },
  {
    title: 'Manage Movies',
    icon: 'AirplayIcon',
    children: [
      {
        title: 'All Movies',
        route: 'movies',
      },
    ],
  },
  {
    title: 'Manage Booking',
    icon: 'FilmIcon',
    children: [
      {
        title: 'All Bookings',
        route: 'Allbookings',
      },
    ],
  },
  {
    title: 'Manage Theaters',
    icon: 'BookmarkIcon',
    children: [
      {
        title: 'All Theaters',
        route: 'theaters',
      },
    ],
  },
  {
    title: 'Manage Users',
    icon: 'UsersIcon',
    children: [
      {
        title: 'All Users',
        route: 'members',
      },
    ],
  },
  // {
  //   title: 'Units',
  //   route: 'units',
  //   icon: 'DivideSquareIcon',
  // },
  // {
  //   title: 'Patients',
  //   route: 'patients',
  //   icon: 'UsersIcon',
  // },
  // {
  //   title: 'Members',
  //   route: 'members',
  //   icon: 'UsersIcon',
  // },
]
