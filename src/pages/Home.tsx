const Home = () => {
  const lightThemeColors = [
    { name: 'Background', color: '#FFF8F0' },
    { name: 'Card', color: '#FFE0B2' },
    { name: 'Primary', color: '#F57C00' },
    { name: 'Accent', color: '#FFC107' },
    { name: 'Text', color: '#6D4C41' },
  ];

  const darkThemeColors = [
    { name: 'Background', color: '#2E2E2E' },
    { name: 'Card', color: '#4E342E' },
    { name: 'Primary', color: '#FF9800' },
    { name: 'Accent', color: '#FFCA28' },
    { name: 'Text', color: '#D7CCC8' },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {/* Light Theme Colors */}
      {lightThemeColors.map((color) => (
        <div
          key={color.name}
          className="flex items-center justify-center p-4 rounded text-black"
          style={{ backgroundColor: color.color }}
        >
          {color.name}
        </div>
      ))}

      {/* Dark Theme Colors */}
      {darkThemeColors.map((color) => (
        <div
          key={color.name}
          className="flex items-center justify-center p-4 rounded text-white"
          style={{ backgroundColor: color.color }}
        >
          {color.name}
        </div>
      ))}
    </div>
  );
};

export default Home;
