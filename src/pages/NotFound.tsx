import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <img src="./404.gif" />
      <div className="row">
        <Link className="button" to="/">
          Back to Main page
        </Link>
      </div>
    </>
  );
};

export default NotFound;
