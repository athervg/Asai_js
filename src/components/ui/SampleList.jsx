import { useEffect, useState, useCallback } from 'react';
import Sample from './Sample';
import SearchBar from './SearchBar';

const SAMPLE_PATHS = [
  '/Users/athervgole/rendered music/housey moment_nobubble.mp3',
  '/Users/athervgole/rendered music/keshaaflp_v2.mp3',
  '/Users/athervgole/rendered music/happy porter intro long.mp3',
  // later: dynamically load from a folder
];

const SampleList = () => {
  const [samples, setSamples] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshList = useCallback(async () => {
    const result = await window.api.getAudioFiles({
      paths: SAMPLE_PATHS,
      search: searchTerm,
    });
    setSamples(result);
  }, [searchTerm]);

  useEffect(() => {
    console.log('window.api', window.api);
    window.api.getAudioFiles({ paths: [
        '/Users/athervgole/rendered music/housey moment_nobubble.mp3',
        '/Users/athervgole/rendered music/keshaaflp_v2.mp3',
        '/Users/athervgole/rendered music/happy porter intro long no ott.mp3'
    ], search: '' }).then(setSamples);
  }, []);

  return (
    <div className="p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button onClick={() => setRefreshTrigger((v) => v + 1)} className="mb-4">
        Refresh
      </button>
      <div className="grid gap-2">
        {samples.length === 0 ? (
          <p>No samples found.</p>
        ) : (
          samples.map((sample, i) => (
            <Sample key={i} path={sample.path} name={sample.name} />
          ))
        )}
      </div>
    </div>
  );
};

export default SampleList;
