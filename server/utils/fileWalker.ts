import path from 'path';
import fs, { Stats } from 'fs';

import _ from 'lodash';

var walker = function (
  dir: string,
  done: (error: NodeJS.ErrnoException | null, result?: any[]) => void,
) {
  const staticPrefix = process.env.UPLOADS_STATIC_FOLDER_PREFIX as string;
  const uploadDir = (process.env.UPLOAD_DIR as string).replace('/', '');
  var results: Array<any> = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = path.resolve(dir, file);
      // Read stats of the file;
      fs.stat(file, function (err, stat) {
        // Walk the subfiles if it is a directory
        if (stat && stat.isDirectory()) {
          walker(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          const filepath = file.split('\\');
          const filename = filepath.pop();
          const parent = filepath.pop();
          // check if parent is root
          const dirname = parent === uploadDir ? '' : parent;
          const basename = path.basename(filename as string, '.png');
          const extension = path.extname(filename as string);
          const url = `http://localhost:8080${staticPrefix}/${dirname}/${filename}`;

          results.push({
            basename,
            extension,
            dirname,
            url,
            size: stat.size,
          });
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

export default walker;
