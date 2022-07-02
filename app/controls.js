import * as visualscript from "./visualscript/index.esm.js"
import AudioManager from './AudioManager'
import transformations from "./transformations"

export const overlay = document.querySelector('visualscript-overlay')
export const overlayDiv = document.createElement('div')
overlay.insertAdjacentElement('beforeend', overlayDiv)

let features = []


// Model Design Tab Initialization
export const designTab = document.getElementById('design')
export const colorscale = document.getElementById('colorscale')
export const transformation = document.getElementById('transformation')
export const threshold = document.getElementById('threshold')
export const dataSelect = document.getElementById('dataSelect')

export const transformFFTData = (o, transformation) => {
    if (o[0] && o[1]){
      if (transformation instanceof Function){
        return o[0].map((arr,i) => {
          return transformation(arr, o[1][i]) // Auto add
      })
    } else console.error('Invalid transformation function provided...')
    } else console.warn('No FFT data yet...')
  }


// ---------------------- Transformation ----------------------
if (transformation){
  transformation.options = Object.keys(transformations)
  transformation.onChange = (ev) => {
    plotData(undefined, undefined, ev.target.value)
  }
}


    // ---------------------- Threshold ----------------------
    if (threshold){

  threshold.onChange = (ev) => {
    plotData(undefined, undefined, undefined,ev.target.value)
  }

}


// ---------------------- Data ----------------------

export const plotData = (data=audio.fftData, which=dataSelect.element.value, how=transformation.element.value, thresh=threshold.element.value) => {

  return new Promise(resolve => {
  if (audio.fftData[0]){

      overlayDiv.innerHTML = `Plotting ${data[0].length} FFT windows...`
      overlay.open = true
      setTimeout(() => {
          let plottedData;
          switch(which){
              case 'Right Channel':
                  transformation.style.display = 'none'
                  plottedData = data[0]
              break;

              case 'Left Channel':
                  transformation.style.display = 'none'
                  plottedData = data[1]
              break;

              case 'Combined':
                  transformation.style.display = ''
                  plottedData = transformFFTData(data, transformations[how])
          }

          if (plottedData) {
              const min = Math.min(...plottedData.map(arr => Math.min(...arr)))
              const max = Math.max(...plottedData.map(arr => Math.max(...arr)))
              threshold.element.min = min
              threshold.element.max = max
              features = plottedData.map(arr => arr.map(v => (v < thresh) ? 0 : v))
              spectrogram.data = features
          } else console.warn('Plot not updated because there was no data')
          overlay.open = false
          resolve(features)
      }, 500)
  }
})
}

if (dataSelect){

dataSelect.options = ['Right Channel', 'Left Channel', 'Combined']

dataSelect.onChange = (ev) => {
    plotData(undefined, ev.target.value)
  }

}

  // ---------------------- Colorscale ----------------------
  export const spectrogram = new visualscript.Spectrogram({
    Plotly
  })
  
  if (colorscale){

    colorscale.options = visualscript.Spectrogram.colorscales
    designTab.insertAdjacentElement('beforeend', spectrogram)
    colorscale.value = spectrogram.colorscale
    colorscale.onChange = (ev) => {
      spectrogram.colorscale = ev.target.value
    }
  }


  // ---------------------- Audio ----------------------
  // const circles = document.getElementById('circles').children
  // const circleMultiplier = 5

  const volume = document.getElementById('volume')

  let frequencyBinCount = Math.pow(2,11);
  let minFreq = 7000
  let maxFreq = 0
  

  const audioInfo = {
    smoothingTimeConstant: 0.2,
    fftSize: frequencyBinCount,
    minDecibels: -127,
    maxDecibels: 0,
    minFreq,
    maxFreq,
    onData: (o, i) => {

      // Update Volume Readout ( first analysis only)
        let volumeSum = 0;
        for (const volume of o.frequencies) volumeSum += volume;
        const averageVolume = volumeSum / o.frequencies.length;
        const volumeVal = (averageVolume / (audio.info.maxDecibels - audio.info.minDecibels))

        if (volume) volume.volume = volumeVal
        // circles[i].children[0].style.width = `${circleMultiplier*100*volumeVal}%`
    }
  }

  export const audio = new AudioManager(audioInfo)
