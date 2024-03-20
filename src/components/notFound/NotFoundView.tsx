import styles from "./NotFoundView.module.css";

const NotFoundView = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundTitle}>404 Not Found</h1>
      <p className={styles.notFoundText}>
        The page you are looking for doesn't exist or another error occurred.
      </p>
      <p className={styles.notFoundText}>
        Go back, or head over to the home page to choose a new direction.
      </p>
    </div>
  );
};

export default NotFoundView;
