import React from 'react';
import {AppGlobalStyles} from "./styles";
import {Building} from '@components/Building';
import {Settings} from '@components/Settings';

const App = () => (
  <>
    <AppGlobalStyles/>
    <Building />
    <Settings />
  </>
);

export default App;
