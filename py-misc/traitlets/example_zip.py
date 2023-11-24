
import zipfile


if __name__ == '__main__':
    with zipfile.ZipFile('./example.zip') as archive:
        filenames = archive.namelist()
        file_to_extract = filenames[0]
        file_to_save_as = './extracted_from_archive.py'
        # You cannot set the filename with extract
        # archive.extract('example_zip.py','./blah.py')
        print('\n'.join(filenames))
        with open(file_to_save_as, 'wb') as f:
            f.write(archive.read(file_to_extract))
