import multer from 'multer';

const upload = multer({ dest: 'uploads/' }); // Configure storage for uploaded files

export function postHandler(req, res) {
    // Implement your image upload logic here
    // Example using multer:
    upload.single('image')(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            // Access uploaded file details from req.file
            // ...
            res.json({ imageBuffer: imageBuffer }); // Adjust response as needed
        }
    });
}

// export default async function handler(req, res) {
//     try {
//         const image = req.file; // Access uploaded file using req.file
//         res.status(200).json({ image }); // Send image information back to the client
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to upload image' });
//     }
// }