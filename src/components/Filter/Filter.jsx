import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { changeStatus, changeStatusStartEnd } from 'hooks/changeStatus';
import { getFilterTasksThunk } from 'redux/tasks/tasksOperations';
import css from './filter.module.scss';

const checklist = [
  { category: 'status', title: 'To do' },
  { category: 'status', title: 'In progress' },
  { category: 'status', title: 'Done' },
  { category: 'priority', title: 'Low' },
  { category: 'priority', title: 'Medium' },
  { category: 'priority', title: 'High' },
  { category: 'start', title: '06:00 - 11:59' },
  { category: 'start', title: '12:00 - 17:59' },
  { category: 'start', title: '18:00 - 23:59' },
  { category: 'start', title: '00:00 - 05:59' },
  { category: 'end', title: '06:00 - 11:59' },
  { category: 'end', title: '12:00 - 17:59' },
  { category: 'end', title: '18:00 - 23:59' },
  { category: 'end', title: '00:00 - 05:59' },
];

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Filter = () => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');

  const [stateFilter, setStateFilter] = useState([]);
  const [searchTasks, setSearchTasks] = useState('');
  const dispatch = useDispatch();

  const resultArr = stateFilter.map(c => {
    const data = changeStatus(c.title);
    const category =
      c.category === 'status'
        ? 'status'
        : c.category === 'priority'
        ? 'priority'
        : c.category === 'start'
        ? 'start'
        : 'end';
    const obj = { [category]: data };
    return obj;
  });

  let arrStatus = [];
  let arrPriority = [];
  let arrStart = [];
  let arrEnd = [];

  // eslint-disable-next-line array-callback-return
  resultArr.map(element => {
    if (element.status) {
      arrStatus.push(element.status);
    }

    if (element.priority) {
      arrPriority.push(element.priority);
    }

    if (element.start) {
      const data = changeStatusStartEnd(element.start);
      arrStart.push(data);
    }

    if (element.end) {
      const data = changeStatusStartEnd(element.end);
      arrEnd.push(data);
    }
  });

  useEffect(() => {
    const newObj = {
      title: searchTasks === '' ? ' ' : searchTasks,
      status: arrStatus,
      priority: arrPriority,
      start: arrStart,
      end: arrEnd,
    };

    dispatch(getFilterTasksThunk(newObj));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrStatus, arrPriority, arrStart]);

  return (
    <div className={css.filterBox}>
      <TextField
        id="standard-search"
        label="Search tasks"
        type="search"
        variant="standard"
        minRows="1"
        maxRows="1"
        autoComplete="off"
        value={searchTasks}
        onChange={e => setSearchTasks(e.target.value)}
        onFocus={() => setStateFilter([])}
        className={css.searchWrapper}
      />

      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        size="small"
        limitTags={screenMobile ? 2 : 2}
        options={checklist}
        disableCloseOnSelect
        openOnFocus
        filterSelectedOptions
        clearOnEscape
        groupBy={option => (option.category + ' of tasks').toUpperCase()}
        onChange={(_, option) => {
          setStateFilter([...option]);
        }}
        onFocus={() => setSearchTasks('')}
        value={stateFilter}
        inputValue={''}
        autoHighlight
        getOptionLabel={option => option.title}
        renderOption={(props, option, { selected }) => (
          <li
            {...props}
            style={{ fontSize: '14px' }}
            className={css.itemSelect}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}
        renderInput={params => (
          <TextField {...params} placeholder="Select filters" />
        )}
        className={css.filterWrapper}
      />
    </div>
  );
};
