import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, ErrorMessage, Form } from 'formik';
import Notiflix from 'notiflix';
import { FiPlus, FiChevronDown } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, getYear } from 'date-fns';
import { profileSchema } from 'hooks/schemaProfile';
import {
  years,
  months,
  weekendDay,
  weekendDayClassName,
} from 'hooks/datePicker';
import {
  getCurrentUserThunk,
  updateAvatarThunk,
  updateUserThunk,
} from 'redux/auth/authOperations';
import { getUser } from 'redux/auth/authSelectors';
import './DatePickerStyles.scss';
import css from './userProfile.module.scss';

const UserProfile = () => {
  const user = useSelector(getUser);
  const [newAvatar, setNewAvatar] = useState(null);
  const [updated, setUpdated] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updated) {
      dispatch(getCurrentUserThunk());
      setUpdated(false);
    }
  }, [dispatch, updated]);

  const handleSubmit = async (values, { resetForm }) => {
    const avatarData = new FormData();
    avatarData.append('avatar', newAvatar);

    const profileData = {
      name: values.name.trim(),
      birthday: values.birthday,
      // email: values.email.trim(),
      phone: values.phone.trim(),
      skype: values.skype.trim(),
    };

    try {
      newAvatar && (await dispatch(updateAvatarThunk(avatarData)));

      (values.name.trim() !== user.name ||
        values.birthday.toISOString() !== user.birthday ||
      //   values.email.trim() !== user.email ||
        values.phone.trim() !== user.phone ||
        values.skype.trim() !== user.skype) &&
        (await dispatch(updateUserThunk(profileData)));

      Notiflix.Notify.success('User profile is succesfully updated');
      setUpdated(true);
      resetForm();
    } catch (error) {
      Notiflix.Notify.failure('Something went wrong. Please try again');
    }
  };

  return (
    <div className={css.userContainer}>
      <div className={css.userWrapper}>
        <Formik
          enableReinitialize
          initialValues={{
            name: user.name || '',
            phone: user.phone ? user.phone : '',
            birthday: user.birthday ? new Date(user.birthday) : new Date(),
            skype: user ? user.skype : '',
            email: user ? user.email : '',
          }}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <div className={css.formAvatar}>
                <div className={css.containerAvatar}>
                  {newAvatar ? (
                    <img
                      src={URL.createObjectURL(newAvatar)}
                      className={css.avatarImage}
                      accept="image/*,.png,.jpeg,.jpg,.gif,.web"
                      alt="avatar"
                    />
                  ) : user?.avatarURL ? (
                    <img
                      src={user?.avatarURL}
                      className={css.avatarImage}
                      alt="avatar"
                    />
                  ) : (
                    <AiOutlineUser className={css.avatarIcon} />
                  )}

                  <label>
                    <button className={css.btnUpload}>
                      <FiPlus />
                    </button>

                    <input
                      className={css.inputUpload}
                      id="avatar"
                      type="file"
                      accept="image/*,.png,.jpeg,.jpg,.gif,.web"
                      onChange={e => {
                        setNewAvatar(e.target.files[0]);
                        handleChange(e);
                      }}
                    ></input>
                  </label>
                </div>

                <h3 className={css.avatarName}>
                  {user.name ? user.name : 'No name'}
                </h3>

                <p className={css.avatarRole}>User</p>
              </div>

              <div className={css.formCenter}>
                <div className={css.formRow}>
                  <label className={css.formLabel}>
                    User Name
                    <input
                      className={css.formInput}
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={e => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    ></input>
                    <ErrorMessage
                      className={css.formError}
                      component="div"
                      name="name"
                    />
                  </label>
                </div>

                <div className={css.formRow}>
                  <label className={css.formLabel}>
                    Birthday
                    <div className={css.pickerBox}>
                      <div className={css.iconCalendarWrapeer}></div>

                      <DatePicker
                        id="date"
                        type="date"
                        name="birthday"
                        input={true}
                        className={css.formInput}
                        dayClassName={date =>
                          weekendDay(date) ? weekendDayClassName : undefined
                        }
                        calendarClassName={css.customCalendarStyle}
                        formatWeekDay={nameOfDay => nameOfDay.slice(0, 1)}
                        selected={values.birthday}
                        onChange={date => {
                          handleChange({
                            target: { name: 'birthday', value: date },
                          });
                        }}
                        dateFormat="dd/MM/yyyy"
                        calendarStartDay={1}
                        closeOnScroll={e => e.target === document}
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                        }) => (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              marginBottom: 10,
                            }}
                          >
                            <select
                              style={{
                                color: '#111111',
                                padding: 5,
                                marginLeft: 5,
                                marginRight: 5,
                                borderRadius: 5,
                              }}
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              style={{
                                color: '#111111',
                                padding: 5,
                                marginRight: 5,
                                borderRadius: 5,
                              }}
                              value={getYear(date)}
                              onChange={({ target: { value } }) =>
                                changeYear(value)
                              }
                            >
                              {years.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      />
                      <FiChevronDown className={css.dateIcon} />
                    </div>
                    <ErrorMessage className={css.formError} name="birthday" />
                  </label>
                </div>

                <div className={css.formRow}>
                  <label className={css.formLabel}>
                    Email
                    <input
                      className={css.formInput}
                      disabled
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={e => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    ></input>
                    <ErrorMessage
                      className={css.formError}
                      component="div"
                      name="email"
                    />
                  </label>
                </div>

                <div className={css.formRow}>
                  <label className={css.formLabel}>
                    Phone
                    <input
                      className={css.formInput}
                      type="tel"
                      name="phone"
                      placeholder="+380"
                      value={values.phone}
                      onChange={e => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    ></input>
                    <ErrorMessage
                      className={css.formError}
                      component="div"
                      name="phone"
                    />
                  </label>
                </div>

                <div className={css.formRow}>
                  <label className={css.formLabel}>
                    Skype
                    <input
                      className={css.formInput}
                      type="text"
                      name="skype"
                      placeholder="Add a skype"
                      value={values.skype}
                      onChange={e => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                    ></input>
                    <ErrorMessage
                      component="div"
                      className={css.formError}
                      name="skype"
                    />
                  </label>
                </div>
              </div>

              <button
                className={css.formBtn}
                type="submit"
                disabled={
                  values.name.trim() === '' ||
                  values.email.trim() === '' ||
                  (newAvatar === null &&
                    values.birthday.toISOString() === user.birthday &&
                    values.name.trim() === user.name &&
                    values.email.trim() === user.email &&
                    values.phone.trim() === user.phone &&
                    values.skype.trim() === user.skype)
                }
              >
                Save changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default UserProfile;
