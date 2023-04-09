const HeroesListItem = (props) => {
  const { name, description, element, onDelete } = props;

  let elementClassName;

  switch (element) {
    case 'fire':
      elementClassName = 'bg-danger bg-gradient';
      break;
    case 'water':
      elementClassName = 'bg-primary bg-gradient';
      break;
    case 'wind':
      elementClassName = 'bg-success bg-gradient';
      break;
    case 'earth':
      elementClassName = 'bg-secondary bg-gradient';
      break;
    default:
      elementClassName = 'bg-warning bg-gradient';
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src='https://plus.unsplash.com/premium_photo-1680503587331-d8d4f8047393?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDR8Q0R3dXdYSkFiRXd8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
        className='img-fluid w-25 d-inline'
        alt='unknown hero'
        style={{ objectFit: 'cover' }}
      />
      <div className='card-body'>
        <h3 className='card-title'>{name}</h3>
        <p className='card-text'>{description}</p>
      </div>
      <span
        onClick={onDelete}
        className='position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light'
      >
        <button
          type='button'
          className='btn-close btn-close'
          aria-label='Close'
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
