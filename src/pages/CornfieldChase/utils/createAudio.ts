export default async function createAudio(url: string, context: AudioContext) {
  let avg = 0;
  // Fetch audio data and create a buffer source
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  const source = context.createBufferSource();
  source.buffer = await new Promise((res) =>
    context.decodeAudioData(buffer, res)
  );
  source.loop = true;
  // source.start(0);
  
  const gain = context.createGain();
  const analyser = context.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(gain);
  // The data array receieve the audio frequencies
  const data = new Uint8Array(analyser.frequencyBinCount);
  return {
    context, // Audio context
    source, // Context Source
    gain, // Audio gain
    data, // Audio frequencies
    avg,
    // This fucntion gets called every frame per audio source
    update: () => {
      analyser.getByteFrequencyData(data);
      avg = data.reduce((prev, cur) => prev + cur / data.length, 0);
      return avg;
    },
  };
}
