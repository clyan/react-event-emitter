import {
  DependencyList,
  useCallback,
  useContext,
  useEffect,
  useMemo
} from "react";
import { EventEmitterContext } from "./eventEmitterRC";

import { BaseEvents, EventEmitter } from "./eventEmitter";

function useEmit<Events extends BaseEvents>() {
  const em = useContext(EventEmitterContext);
  return useCallback(
    <E extends keyof Events>(type: E, ...args: Events[E]) => {
      console.log("emitter emit: ", type, args);
      em.emit(type, ...args);
    },
    [em]
  );
}

export function useEventEmitter<Events extends BaseEvents>() {
  const emit = useEmit<Events>();
  // 这里使用 useMemo 产生的 emitter 对象的原因是在当前组件树 emitter 仅初始化一次
  const emitter = useMemo(() => new EventEmitter<Events>(), []);
  return {
    useListener: <E extends keyof Events>(
      type: E,
      listener: (...args: Events[E]) => void,
      deps: DependencyList = []
    ) => {
      const em = useContext(EventEmitterContext);
      useEffect(() => {
        console.log("emitter add: ", type, listener.name);
        em.add(type, listener);
        return () => {
          console.log("emitter remove: ", type, listener.name);
          em.remove(type, listener);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [listener, type, ...deps]);
    },
    emit,
    emitter
  };
}
