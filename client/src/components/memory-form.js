import React from 'react';
import {connect} from 'react-redux';
import axios from './../utils/axios-config';
import dateMaker from './../utils/date-maker';
import tagsMaker from './../utils/tags-maker';
import dateErrorsCatcher from './../utils/date-errors-catcher';
import classNames from 'classnames';
import errorsActions from './../actions/errors-actions';

const initialState = {
  day: '',
  month: '',
  year: '',
  location: '',
  memory: '',
  tags: '',
  memoryErrors: {},
  dateErrors: {}
};

class MemoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit (e) {
    e.preventDefault();

    const {day, month, year} = this.state;

    let dateErrors = dateErrorsCatcher(day, month, year);

    if (dateErrors.isError) {
      this.setState({dateErrors: dateErrors.errors});
      return;
    } else {
      this.setState({dateErrors: {}});
    }

    let date = dateMaker(day, month, year);

    let tags = tagsMaker(this.state.tags);

    const memoryObject = {
      date: date,
      location: this.state.location,
      text: this.state.memory,
      tags: tags
    };

    axios.post('/api/memories', memoryObject)
      .then(res => {
        console.log(res.data);
        this.setState(initialState);
      })
      .catch(err => {
        let errors = !err.response ? err : err.response.data;
        this.setState({memoryErrors: errors});
      });
  }

  render () {
    const {dateErrors, memoryErrors} = this.state;

    return(
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 m-auto" style={styles.form}>
            <h1 className="text-center">Store a Memory</h1>
            <p><b>Instructions:</b> <em>Leave all date fields blank to default to current date,
              or specify at least a year to set custom date. Incorrect date information will block form submission.
              The location field is flexible, given one or more specific address markers is submitted.
              Tag your memory with relevant descriptive words, separating each tag with a comma.
            </em></p>
            <hr />
            <form
              onSubmit={e => this.onSubmit(e)}
              >
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="month">Month</label>
                  <input
                    type="number"
                    className={classNames('form-control', {
                      'is-invalid': dateErrors.month
                    })}
                    name="month"
                    placeholder="MM"
                    value={this.state.month}
                    onChange={e => this.onChange(e)}
                    />
                  {dateErrors.month && (
                    <div className="invalid-feedback">
                      {dateErrors.month}
                    </div>
                  )}
                </div>
                <div className="form-group col">
                  <label htmlFor="day">Day</label>
                  <input
                    type="number"
                    className={classNames('form-control', {
                      'is-invalid': dateErrors.day
                    })}
                    name="day"
                    placeholder="DD"
                    value={this.state.day}
                    onChange={e => this.onChange(e)}
                    />
                  {dateErrors.day && (
                    <div className="invalid-feedback">
                      {dateErrors.day}
                    </div>
                  )}
                </div>
                <div className="form-group col">
                  <label htmlFor="year">Year</label>
                  <input
                    type="number"
                    className={classNames('form-control', {
                      'is-invalid': dateErrors.year
                    })}
                    name="year"
                    placeholder="YYYY"
                    value={this.state.year}
                    onChange={e => this.onChange(e)}
                    />
                  {dateErrors.year && (
                    <div className="invalid-feedback">
                      {dateErrors.year}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  className={classNames('form-control', {
                    'is-invalid': memoryErrors.location
                  })}
                  placeholder="Enter a landmark, street address, city, state, zip code, and/or country"
                  value={this.state.location}
                  onChange={e => this.onChange(e)}
                  />
                {memoryErrors.location && (
                  <div className="invalid-feedback">
                    {memoryErrors.location}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="memory">Describe Your Memory</label>
                <textarea
                  className={classNames('form-control', {
                    'is-invalid': memoryErrors.text
                  })}
                  name="memory"
                  value={this.state.memory}
                  onChange={e => this.onChange(e)}
                  />
                {memoryErrors.text && (
                  <div className="invalid-feedback">
                    {memoryErrors.text}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tag Your Memory</label>
                <input
                  className={classNames('form-control', {
                    'is-invalid': memoryErrors.tags
                  })}
                  name="tags"
                  value={this.state.tags}
                  onChange={e => this.onChange(e)}
                  />
                {memoryErrors.tags && (
                  <div className="invalid-feedback">
                    {memoryErrors.tags}
                  </div>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">Submit Memory</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.memory
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setErrors: (category, errors) => {
      dispatch(errorsActions.setErrors(category, errors));
    },
    clearErrors: (category) => {
      dispatch(errorsActions.clearErrors(category));
    }
  };
}

const styles = {
  form: {
    position: 'relative',
    margin: 'auto',
    top: '25px',
    left: 0,
    right: 0,
    bottom: 0
  }
}

export default MemoryForm;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MemoryForm);
