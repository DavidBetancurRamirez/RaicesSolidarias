import { RsButton } from '@components/wrappers/RsButton';
import { useTheme } from '@hooks/useTheme';

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 space-y-4">
      <RsButton onClick={toggleTheme}>Toggle Theme</RsButton>
      <button onClick={toggleTheme}>Toggle</button>
      <p>Theme: {theme}</p>
      <div className="bg-sun text-leaf dark:text-dk-cloud p-4 rounded">
        bg-sun
      </div>
      <div className="bg-sky text-cloud dark:text-dk-leaf p-4 rounded">
        bg-sky
      </div>
      <div className="bg-heart text-leaf dark:text-dk-sky p-4 rounded">
        bg-heart
      </div>
    </div>
  );
};

export default Home;
