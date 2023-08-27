import elevatorReducer from '@store/elevator/slice';
import settingsReducer from '@store/settings/slice';

const rootReducer = {
  elevator: elevatorReducer,
  settings: settingsReducer,
}

export default rootReducer;
