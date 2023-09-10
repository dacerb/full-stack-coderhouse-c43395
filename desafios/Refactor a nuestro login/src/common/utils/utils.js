import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { copyFileSync } from 'fs';
import multer from 'multer';
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(__filename)

const removeStringForWindows = '\\\\common\\\\utils';
const removeStringForMacOS = '/common/utils';
let __dirnameCleanPath

__dirnameCleanPath = _dirname.replace(new RegExp(removeStringForWindows), '');
__dirnameCleanPath = __dirnameCleanPath.replace(new RegExp(removeStringForMacOS), '');

const __dirname = __dirnameCleanPath

export default __dirname;

// Configuracion MULTER
const storageThumbnails = multer.diskStorage(
    {
        // ubicaion del directorio donde voy a guardar los archivos
        destination: function (req, files, cb) {
            cb(null, `${__dirname}/public/thumbnails`)
        },

        // el nombre que quiero que tengan los archivos que voy a subir
        filename: function (req, files, cb) {
            // console.log(file);
            cb(null, `${Date.now()}-${files.originalname}`)
        }
    }
)

export const uploaderThumbnails = multer({
    storage:storageThumbnails, // un manejador de storage del tipo middleware para lo que son los Thumbnails
    // si se genera algun error, lo capturamos
    onError: function (err, next) {
        console.log(err);
        next();
    }
});

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    };