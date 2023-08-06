import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginThunk } from 'redux/auth/authOperations';
import AuthNavigate from 'components/AuthNavigate/AuthNavigate';
import ModalVerify from './ModalVerify/ModalVerify';
import logoD1 from 'images/auth/login-d.png';
import logoD2x from 'images/auth/login-d@2x.png';
import icon from 'images/auth/auth.svg';
import css from './loginForm.module.scss';

const LoginForm = () => {
  const [modalVerify, setModalVerify] = useState(false);
  const [hidden, setHidden] = useState('password');
  const dispatch = useDispatch();

  useEffect(() => {
    const closeModal = ({ code }) => {
      if (code === 'Escape' && modalVerify) {
        setModalVerify(!modalVerify);
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [modalVerify]);

  const toggleModal = () => {
    setModalVerify(!modalVerify);
  };

  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setModalVerify(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values, { resetForm }) => {
      dispatch(
        loginThunk({
          email: values.email,
          password: values.password,
        })
      );

      resetForm();
    },

    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).max(64).required(),
    }),
  });

  return (
    <div className={css.formikWrapper}>
      <div className={css.formikContainer}>
        <form className={css.form} onSubmit={formik.handleSubmit}>
          <h1 className={css.formTitle}>Log In</h1>

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
                autoFocus
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
            <span className={css.btnText}>Log In</span>
            <svg className={css.svg}>
              <use href={icon + '#icon-log-in'} />
            </svg>
          </button>
        </form>

        <AuthNavigate route={'/register'} text="Sign Up" />

        <div className={css.btnEmailBox}>
          <p className={css.btnEmailTitle}>Resend a verification email?</p>
          <button className={css.btnEmail} onClick={toggleModal}>Yes</button>
        </div>

        {modalVerify && (
          <ModalVerify closeModal={closeModal} toggleModal={toggleModal} />
        )}

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

export default LoginForm;
