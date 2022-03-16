import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { regularTheme, darkTheme } from './consts';
import { useFetch } from './hooks/use-fetch.hook';
import { ApiRoute, Sections } from './models';
import { Footer, Header, MainContent } from './modules';

const theme1 = createTheme(regularTheme);
const theme2 = createTheme(darkTheme);

const App = () => {
  const { data } = useFetch<Sections>(ApiRoute.SECTIONS);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  return (
    <ThemeProvider theme={isDarkTheme ? theme2 : theme1}>
      <Header
        content={data?.headerSection}
        onThemeToggle={() => setIsDarkTheme((isDark) => !isDark)}
        isDarkTheme={isDarkTheme}
      />
      <MainContent
        content={{
          primarySections: data?.primarySections,
          secondarySections: data?.secondarySections,
        }}
      />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
