export async function convertImageToFileURL(imageFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target) {
          const dataURL = event.target.result as string;
          resolve(dataURL);
        } else {
          reject(new Error('Failed to read the file.'));
        }
      };
  
      reader.onerror = (event) => {
        reject(new Error('Failed to read the file: ' + event.target?.error));
      };
  
      reader.readAsDataURL(imageFile);
    });
  }