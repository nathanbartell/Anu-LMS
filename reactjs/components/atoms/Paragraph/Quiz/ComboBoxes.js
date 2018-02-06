import React  from 'react';
import PropTypes from 'prop-types';
import Paragraphs from '../index';

class ComboBoxes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: 0,
    };

    this.handleAddSelection = this.handleAddSelection.bind(this);
  }

  componentDidMount() {
    // Report to the parent component that the loading is done.
    if (this.props.handleParagraphLoaded) {
      this.props.handleParagraphLoaded(this.props.id);
    }
  }

  componentDidUpdate() {
    // Report to the parent component that the loading is done.
    if (this.props.handleParagraphLoaded) {
      this.props.handleParagraphLoaded(this.props.id);
    }
  }

  handleAddSelection(radioId) {
    this.setState({ active: radioId });

    if (this.props.handleQuizChange) {
      this.props.handleQuizChange(this.props.id, radioId);
    }
  }

  render() {
    const { id, options, title, blocks, handleParagraphLoaded } = this.props;

    return (
      <div className="container quiz comboboxes">
        <div className="row">
          <div className="col-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
            <div className="title">{title}</div>

            {blocks.length > 0 &&
            <div className="blocks">
              <Paragraphs blocks={blocks} handleParagraphLoaded={handleParagraphLoaded} />
            </div>
            }

            {options.map(radio => (
              <div className="radio" key={radio.uuid}>
                <input
                  type="radio"
                  name={id}
                  value={radio.uuid}
                  checked={this.state.active === radio.uuid}
                />
                <span onClick={() => this.handleAddSelection(radio.uuid)} />
                <label onClick={() => this.handleAddSelection(radio.uuid)}>
                  {radio.value}
                  </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
}

ComboBoxes.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    value: PropTypes.string,
    is_answer: PropTypes.number,
  })),
  blocks: PropTypes.arrayOf(PropTypes.shape), // Other paragraphs.
  handleQuizChange: PropTypes.func,
  handleParagraphLoaded: PropTypes.func,
};

ComboBoxes.defaultProps = {
  blocks: [],
};

export default ComboBoxes;
