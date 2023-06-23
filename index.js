const audiosOne =[
    {
        keyCode: 81,
        keyTrigger: 'Q',
        id: 'Heater-1',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
      },
      {
        keyCode: 87,
        keyTrigger: 'W',
        id: 'Heater-2',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
      },
      {
        keyCode: 69,
        keyTrigger: 'E',
        id: 'Heater-3',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
      },
      {
        keyCode: 65,
        keyTrigger: 'A',
        id: 'Heater-4',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
      },
      {
        keyCode: 83,
        keyTrigger: 'S',
        id: 'Clap',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
      },
      {
        keyCode: 68,
        keyTrigger: 'D',
        id: 'Open-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
      },
      {
        keyCode: 90,
        keyTrigger: 'Z',
        id: "Kick-n'-Hat",
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
      },
      {
        keyCode: 88,
        keyTrigger: 'X',
        id: 'Kick',
        url: 'https://www.myinstants.com/media/sounds/kick_1.mp3'
      },
      {
        keyCode: 67,
        keyTrigger: 'C',
        id: 'Closed-HH',
        url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
      }
    ];

const App = () => {
    const [drumPadStyle, setDrumPadStyle] = React.useState({});
    const [volume, setVolume] = React.useState(0.5);
    const [record, setRecord] = React.useState([]);

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key.toUpperCase();
            handleClick(key);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    
    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };
    const handleClick = (buttonId) => {
        audiosOne.find((audio) => {
            if (audio.keyTrigger === buttonId ) {
               const audioElement = new Audio(audio.url);
               audioElement.volume = volume;
               audioElement.play();
               setRecord((prev) => [...prev, audioElement]);
            }
        });
        const newStyle = {
            ...drumPadStyle,
            [buttonId]: { backgroundColor: 'red' },
        };
    setDrumPadStyle(newStyle);
    setTimeout(() => {
        const normalStyle = {
            ...drumPadStyle,
            [buttonId]: { backgroundColor: '#302f2f' },
        };
        setDrumPadStyle(normalStyle);
        }, 100);
    };
    return (
        <div id="drum-machine">
            <div id="display">
                <div id="display-items">
                        <h3>Record</h3>
                        <div id="record-display">

                            <button className="play-button" onClick={async () => {
                                for(const audio of record) {
                                    audio.volume = volume;
                                    audio.play();
                                    await new Promise((resolve) => {
                                        audio.onended = resolve;
                                    });
                                }
                            }}
                            >Play</button>
                            <button className="clear-button" onClick={() => setRecord([])}>Clear</button>
                        </div>
                    <h3>Volume</h3>
                    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}/>
                </div>
                <div id="display-drum-pads">
                    <button id ='Q' className="drum-pad" style={drumPadStyle['Q']} onClick={() => handleClick('Q')}>Q</button>
                    <button id ='W' className="drum-pad" style={drumPadStyle['W']} onClick={() => handleClick('W')}>W</button>
                    <button id ='E' className="drum-pad" style={drumPadStyle['E']} onClick={() => handleClick('E')}>E</button>
                    <button id ='A' className="drum-pad" style={drumPadStyle['A']} onClick={() => handleClick('A')}>A</button>
                    <button id ='S' className="drum-pad" style={drumPadStyle['S']} onClick={() => handleClick('S')}>S</button>
                    <button id ='D' className="drum-pad" style={drumPadStyle['D']} onClick={() => handleClick('D')}>D</button>
                    <button id ='Z' className="drum-pad" style={drumPadStyle['Z']} onClick={() => handleClick('Z')}>Z</button>
                    <button id ='X' className="drum-pad" style={drumPadStyle['X']} onClick={() => handleClick('X')}>X</button>
                    <button id ='C' className="drum-pad" style={drumPadStyle['C']} onClick={() => handleClick('C')}>C</button>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
