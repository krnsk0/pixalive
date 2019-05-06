import React, {useState} from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

  function ColorPicker() {

    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState({
      h: '0',
      s: '0',
      l: '0',
      o: '1'
    });

    const handleClick = () => {
      setDisplayColorPicker(!displayColorPicker)
    };

    const handleClose = () => {
      setDisplayColorPicker(false)
    };

    const handleChange = (changedColor) => {
      console.log('CURRENT COLOR', changedColor)
      //console.log('STATE', )
      let newColor = {
        h: Number(changedColor.hsl.h).toFixed(0),
        s: changedColor.hsl.s.toFixed(2) * 100,
        l: changedColor.hsl.l.toFixed(2) * 100,
        o: changedColor.hsl.a.toFixed(2)
      }
      setColor(newColor)
    };

    const convertBack = (convertBackColor) => {

      return {
        h: convertBackColor.h,
        s: convertBackColor.s / 100,
        l: convertBackColor.l / 100,
        a: convertBackColor.o
      }
    }
    const styles = reactCSS({
      // eslint-disable-next-line quote-props
      'default': {
        color: {
          width: '40px',
          height: '40px',
          borderRadius: '2px',
          background: `hsla(${ color.h }, ${ color.s }%, ${ color.l }%, ${ color.o })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ handleClick }>
          <div style={ styles.color } />
        </div>
        { displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ handleClose } />
          <SketchPicker color={ convertBack(color) } onChange={ handleChange } />
        </div> : null }
      </div>
    )
  }


export default ColorPicker;
