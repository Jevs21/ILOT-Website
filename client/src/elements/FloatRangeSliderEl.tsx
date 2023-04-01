import { Box, Stack, Typography } from '@suid/material';
import rangeSlider from 'range-slider-input';
import 'range-slider-input/dist/style.css';
import { batch, createEffect, createMemo, createSignal } from 'solid-js';
import { useGlobalContext } from '../global/store';
import StackRowCentered from './StackRowCentered';

const FloatRangeSliderEl = (props) => {
  const {addInvFilter, removeInvFilter } = useGlobalContext();
  // const [prevLowVal, setPrevLowVal] = createSignal<number>(props.opts.min);
  // const [prevHighVal, setPrevHighVal] = createSignal<number>(props.opts.max);
  // const [lowVal, setLowVal] = createSignal<number>(props.opts.min);
  // const [highVal, setHighVal] = createSignal<number>(props.opts.max);
  const [prevLowVal, setPrevLowVal] = createSignal<number>(props.initialVals[0]);
  const [prevHighVal, setPrevHighVal] = createSignal<number>(props.initialVals[1]);
  const [lowVal, setLowVal] = createSignal<number>(props.initialVals[0]);
  const [highVal, setHighVal] = createSignal<number>(props.initialVals[1]);
  let htmlElement!: HTMLElement;
  let slider;

  const updateFilters = () => {
    console.log('updateFilters() called');
    
    batch(() => {
      removeInvFilter(props.key, prevLowVal());
      if (lowVal() !== props.opts.min) {
        addInvFilter(props.key, lowVal(), "range_min");
      }
      setPrevLowVal(lowVal());
  
      removeInvFilter(props.key, prevHighVal());
      if (highVal() !== props.opts.max) {
        addInvFilter(props.key, highVal(), "range_max");
      }
      setPrevHighVal(highVal());
    })
  }

  createEffect(() => {
    if (props.isVisible) {
      if (!htmlElement) {
        htmlElement = document.getElementById(props.id);
      }

      slider = rangeSlider(htmlElement, {
        min: props.opts.min,
        max: props.opts.max,
        value: [props.initialVals[0], props.initialVals[1]],
        onInput: (value) => {
          // console.log(value);
          setLowVal(value[0]);
          setHighVal(value[1]);
        },
        onThumbDragEnd: () => {
          updateFilters();
        },
        onRangeDragEnd: () => {
          updateFilters();
        }

      });
      // console.log(slider);
      // console.log(props.opts);
    }
  })

  const sliderText = createMemo(() => {
    if ((lowVal() !== props.opts.min) || (highVal() !== props.opts.max)) {
      return `${lowVal()} - ${highVal()}`;
    } else {
      return 'All';
    }
  });

  return (
    <Stack>
      <StackRowCentered>
        <Typography variant='body1' px={1} paddingBottom={3}>{sliderText()}</Typography>
      </StackRowCentered>
      <Box component='div' id={props.id}></Box>
      <StackRowCentered justifyContent='space-between'>
        <Typography variant='body2' px={0} paddingTop={1}>Min: {props.opts.min}</Typography>
        <Typography variant='body2' px={0} paddingTop={1}>Max: {props.opts.max}</Typography>
      </StackRowCentered>
    </Stack>
  );
};

export default FloatRangeSliderEl;