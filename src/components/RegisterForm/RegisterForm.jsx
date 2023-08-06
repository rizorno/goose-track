import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signUpThunk } from 'redux/auth/authOperations';
import AuthNavigate from 'components/AuthNavigate/AuthNavigate';
import logoD1 from 'images/auth/register-d.png';
import logoD2x from 'images/auth/register-d@2x.png';
import icon from 'images/auth/auth.svg';
import css from './registerForm.module.scss';

const RegisterForm = () => {
  const [hidden, setHidden] = useState('password');
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    onSubmit: (values, { resetForm }) => {
      dispatch(
        signUpThunk({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );

      resetForm();
    },

    validationSchema: yup.object().shape({
      name: yup.string().trim().min(3).max(32).required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).max(64).required(),
    }),
  });

  return (
    <div className={css.formikWrapper}>
      <div className={css.formikContainer}>
        <form className={css.form} onSubmit={formik.handleSubmit}>
          <h1 className={css.formTitle}>Sign Up</h1>

          <label className={css.labelBox}>
            <p
              className={
                formik.touched.name
                  ? formik.errors.name
                    ? css.labelError
                    : css.labelOk
                  : css.label
              }
            >
              Name
            </p>

            <div className={css.inputBox}>
              <input
                className={
                  formik.touched.name
                    ? formik.errors.name
                      ? css.inputError
                      : css.inputOk
                    : css.input
                }
                type="name"
                name="name"
                placeholder="Name"
                autoFocus
                autoComplete="off"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name ? (
                formik.errors.name ? (
                  <>
                    <span className={css.messageError}>
                      This is an ERROR name
                    </span>
                    <svg className={css.iconError}>
                      <use href={icon + '#icon-error'}></use>
                    </svg>
                  </>
                ) : (
                  <>
                    <span className={css.messageOk}>
                      This is an CORRECT name
                    </span>
                    <svg className={css.iconDone}>
                      <use href={icon + '#icon-done'}></use>
                    </svg>
                  </>
                )
              ) : null}
            </div>
          </label>

          <label className={css.labelBox}>
            <p
              className={
                formik.touched.email
                  ? formik.errors.email
                    ? css.labelError
                    : css.labelOk
                  : css.label
              }
            >
              Email
            </p>

            <div className={css.inputBox}>
              <input
                className={
                  formik.touched.email
                    ? formik.errors.email
                      ? css.inputError
                      : css.inputOk
                    : css.input
                }
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email ? (
                formik.errors.email ? (
                  <>
                    <span className={css.messageError}>
                      This is an ERROR email
                    </span>
                    <svg className={css.iconError}>
                      <use href={icon + '#icon-error'}></use>
                    </svg>
                  </>
                ) : (
                  <>
                    <span className={css.messageOk}>
                      This is an CORRECT email
                    </span>
                    <svg className={css.iconDone}>
                      <use href={icon + '#icon-done'}></use>
                    </svg>
                  </>
                )
              ) : null}
            </div>
          </label>

          <label className={css.labelBox}>
            <p
              className={
                formik.touched.password
                  ? formik.errors.password
                    ? css.labelError
                    : css.labelOk
                  : css.label
              }
            >
              Password
            </p>

            <div className={css.inputBox}>
              <input
                className={
                  formik.touched.password
                    ? formik.errors.password
                      ? css.inputError
                      : css.inputOk
                    : css.input
                }
                type={hidden === 'password' ? 'password' : 'text'}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password ? (
                formik.errors.password ? (
                  <>
                    <span className={css.messageError}>
                      This is an ERROR password
                    </span>
                    <svg className={css.iconError}>
                      <use href={icon + '#icon-error'}></use>
                    </svg>
                  </>
                ) : (
                  <>
                    <span className={css.messageOk}>
                      This is an CORRECT password
                    </span>
                    <svg className={css.iconDone}>
                      <use href={icon + '#icon-done'}></use>
                    </svg>
                  </>
                )
              ) : null}
            </div>

            <div
              className={formik.touched.password ? css.showError : css.show}
              onClick={() =>
                hidden === 'password'
                  ? setHidden('text')
                  : setHidden('password')
              }
            >
              {hidden === 'password' ? (
                <svg className={css.iconShow}>
                  <use href={icon + '#icon-eye'}></use>
                </svg>
              ) : (
                <svg className={css.iconShow}>
                  <use href={icon + '#icon-eye-blocked'}></use>
                </svg>
              )}
            </div>
          </label>

          <button className={css.formBtn} type="submit">
            <span className={css.btnText}>Sign Up</span>
            <svg className={css.svg}>
              <use href={icon + '#icon-log-in'} />
            </svg>
          </button>
        </form>

        <AuthNavigate route={'/login'} text="Log In" />

        <picture className={css.img}>
          <source
            srcSet={`${logoD1} 1x, ${logoD2x} 2x`}
            media="(min-width: 1440px)"
            type="image/png"
          />

          <img src={`${logoD1} 1x, ${logoD2x} 2x`} alt="goose" />
        </picture>
      </div>
    </div>
  );
};

export default RegisterForm;
