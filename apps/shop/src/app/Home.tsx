import {
  useAppDispatch,
  useAppSelector,
  increment,
} from '@nx-mf-demo/shared-state';

export default function Home() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>Home</div>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <div>Value: {value}</div>
      </div>
    </>
  );
}
