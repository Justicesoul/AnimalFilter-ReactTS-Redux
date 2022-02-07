import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="not-found__button">
        <Link className="button" to="/">
          <img
            className="not-found__image"
            src="./404.gif"
            title="To the main page"
          />
        </Link>
      </div>
    </>
  );
};

export default NotFound;
