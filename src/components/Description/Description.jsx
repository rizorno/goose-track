import viewM1 from 'images/description/view-m.png';
import viewM2x from 'images/description/view-m@2x.png';
import viewT1 from 'images/description/view-t.png';
import viewT2x from 'images/description/view-t@2x.png';
import viewD1 from 'images/description/view-d.png';
import viewD2x from 'images/description/view-d@2x.png';
import sidebarM1 from 'images/description/sidebar-m.png';
import sidebarM2x from 'images/description/sidebar-m@2x.png';
import sidebarT1 from 'images/description/sidebar-t.png';
import sidebarT2x from 'images/description/sidebar-t@2x.png';
import sidebarD1 from 'images/description/sidebar-d.png';
import sidebarD2x from 'images/description/sidebar-d@2x.png';
import oneM1 from 'images/description/one-m.png';
import oneM2x from 'images/description/one-m@2x.png';
import oneT1 from 'images/description/one-t.png';
import oneT2x from 'images/description/one-t@2x.png';
import oneD1 from 'images/description/one-d.png';
import oneD2x from 'images/description/one-d@2x.png';
import css from './description.module.scss';

const Description = () => {
  return (
    <div className={css.container}>
      <section className={css.section}>
        <div>
          <h2 className={css.number}>1.</h2>
          <h3 className={css.title}>Calendar</h3>
          <h4 className={css.subtitle}>View</h4>

          <p className={css.descript}>
            GooseTrack's Calendar view provides a comprehensive overview of your
            schedule, displaying all your tasks, events, and appointments in a
            visually appealing and intuitive layout.
          </p>
        </div>

        <picture>
          <source
            srcSet={`${viewD1} 1x, ${viewD2x} 2x`}
            media="(min-width: 1440px)"
            type="image/png"
          />
          <source
            srcSet={`${viewT1} 1x, ${viewT2x} 2x`}
            media="(min-width: 768px)"
            type="image/png"
          />
          <source
            srcSet={`${viewM1} 1x, ${viewM2x} 2x`}
            media="(max-width: 767px)"
            type="image/png"
          />
          <img src={`${viewM1} 1x, ${viewM2x} 2x`} alt="calendar" />
        </picture>
      </section>

      <section className={`${css.section} ${css.sectionEvent}`}>
        <div className={css.event}>
          <h2 className={css.number}>2.</h2>
          <h4 className={css.subtitle}>Sidebar</h4>

          <p className={css.descript}>
            GooseTrack offers easy access to your account settings, calendar,
            and filters. The "My Account" section allows you to manage your
            profile information and preferences, while the calendar provides a
            quick and convenient way to view your upcoming events and tasks.
          </p>
        </div>

        <picture>
          <source
            srcSet={`${sidebarD1} 1x, ${sidebarD2x} 2x`}
            media="(min-width: 1440px)"
            type="image/png"
          />
          <source
            srcSet={`${sidebarT1} 1x, ${sidebarT2x} 2x`}
            media="(min-width: 768px)"
            type="image/png"
          />
          <source
            srcSet={`${sidebarM1} 1x, ${sidebarM2x} 2x`}
            media="(max-width: 767px)"
            type="image/png"
          />
          <img src={`${sidebarM1} 1x, ${sidebarM2x} 2x`} alt="sidebar" />
        </picture>
      </section>

      <section className={css.section}>
        <div>
          <h2 className={css.number}>3.</h2>
          <h3 className={css.title}>All in</h3>
          <h4 className={css.subtitle}>One</h4>

          <p className={css.descript}>
            GooseTrack is an all-in-one productivity tool that helps you stay on
            top of your tasks, events, and deadlines. Say goodbye to scattered
            to-do lists and hello to streamlined productivity with GooseTrack.
          </p>
        </div>

        <picture>
          <source
            srcSet={`${oneD1} 1x, ${oneD2x} 2x`}
            media="(min-width: 1440px)"
            type="image/png"
          />
          <source
            srcSet={`${oneT1} 1x, ${oneT2x} 2x`}
            media="(min-width: 768px)"
            type="image/png"
          />
          <source
            srcSet={`${oneM1} 1x, ${oneM2x} 2x`}
            media="(max-width: 767px)"
            type="image/png"
          />
          <img src={`${oneM1} 1x, ${oneM2x} 2x`} alt="all in" />
        </picture>
      </section>
    </div>
  );
};

export default Description;
