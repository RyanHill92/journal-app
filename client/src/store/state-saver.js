import jwtDecode from 'jwt-decode';
import setAuthHeader from './../utils/set-header';

const initialState = {
  user: {
    _id: '',
    isAuth: false
  },
  errors: {
    memoryDate: {},
    memoryBody: {},
    login: {},
    register: {}
  },
  memories: []
};

class StateSaver {

  loadState() {
    try {
      let token = localStorage.getItem('token');
      let decoded = jwtDecode(token);
      //If current timestamp is greater than token's exp date, nuke it.
      if (decoded.exp * 1000 - Date.now() < 0) {
        setAuthHeader();
        localStorage.removeItem('token');
        alert('Session expired! Please log out and log back in.');
      } else {
        setAuthHeader(token);
      }
    } catch (e) {
      console.log('No token in local storage!');
    }

    try {
      //Look for a saved JSON state object in localStorage.
      let savedState = localStorage.getItem('MemoryMapState');
      //If it's empty, start fresh.
      if (savedState === null) {
        return this.initializeState();
      }
      //Otherwise, return a JS object from that stored JSON.
      let packageWithErrors = JSON.parse(savedState);
      //So field errors don't persist in case of refresh.
      console.log('Loaded state from before refresh minus errors!');
      return {
        ...packageWithErrors,
        errors: initialState.errors
      };

    } catch (e) {
      //Any problems? Start fresh.
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      //Stringify the passed state object, which will be from redux.
      let stateToSave = JSON.stringify(state);
      //Save that JSON snapshot of the store to localStorage.
      localStorage.setItem('MemoryMapState', stateToSave);

    } catch (e) {
      console.log('Unable to store redux state in local storage.');
      return;
    }
  }

  initializeState () {
    //Return the initial store state object.
    return initialState;
  }
}

export default StateSaver;
