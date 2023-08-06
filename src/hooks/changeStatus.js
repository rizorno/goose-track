export const changeStatus = data => {
  switch (data) {
    case 'toDo':
      return 'To do';
    case 'inProgress':
      return 'In progress';
    case 'done':
      return 'Done';

    case 'To do':
      return 'toDo';
    case 'In progress':
      return 'inProgress';
    case 'Done':
      return 'done';

    case 'Low':
      return 'low';
    case 'Medium':
      return 'medium';
    case 'High':
      return 'high';
    default:
      return data;
  }
};

export const changeStatusStartEnd = data => {
  const result = data.slice(0, 2);

  switch (result) {
    case '06':
      return 'morning';
    case '12':
      return 'afternoon';
    case '18':
      return 'evening';
    case '00':
      return 'night';
    default:
      return data;
  }
};
