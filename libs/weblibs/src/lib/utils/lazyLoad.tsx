import { lazy } from 'react';
//not working as expected when in a shared lib
export function lazyLoad(path: string, namedExport: string | null = null) {
  return lazy(() => {
    const promise = import(path);
    if (namedExport == null) {
      return promise;
    } else {
      return promise.then((module) => ({ default: module[namedExport] }));
    }
  });
}
