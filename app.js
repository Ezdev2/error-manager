const express = require('express');
const app = express();

class CloudStorage {
  constructor(storageCapacity) {
    this.storageCapacity = storageCapacity;
  }

  uploadFile(fileSize) {
    if (isNaN(fileSize)) {
      throw new NotAuthorized('Non autorisé. La taille du fichier doit être une valeur numérique.');
    }
    if (fileSize > this.storageCapacity) {
      throw new StockageInsufisantCloud('Stockage insuffisant sur le cloud.');
    } else if (fileSize === 404) {
      throw new FileNotFound('Fichier non trouvé.');
    } else if (fileSize === 504) {
      throw new ServerDown('Serveur inaccessible.');
    } else if (fileSize === 400) {
      throw new BadFileType('Type de fichier incorrect.');
    } else if (fileSize === 429) {
      throw new TooManyRequest('Trop de requêtes.');
    } else if (fileSize === 408) {
      throw new RequestTimeout('Timeout de la requête.');
    } else if (fileSize === 423) {
      throw new FileTooLarge('Fichier trop volumineux.');
    } else if (fileSize === 501) {
      throw new NotImplemented('Non implémenté.');
    } else if (fileSize === 500) {
      throw new ServerError('Erreur du serveur.');
    } else if (fileSize === 100) {
      throw new DuplicatedFile('Fichier dupliqué.');
    } else if (fileSize === 423) {
      throw new LockException('Verrouillage du fichier.');
    } else if (fileSize === 453) {
      throw new LegalReason('Raison légale.');
    } else if (fileSize === 998) {
      throw new FilenameInvalid('Nom de fichier non valide.');
    } else if (fileSize === 999) {
      throw new SensitiveFile('Fichier sensible.');
    } else if (fileSize === 1000) {
      throw new NotAuthorized('Non autorisé.');
    }

    // Simuler le téléchargement du fichier
    return 'Fichier téléchargé avec succès.';
  }
}

class StockageInsufisantCloud extends Error {}
class FileNotFound extends Error {}
class ServerDown extends Error {}
class BadFileType extends Error {}
class TooManyRequest extends Error {}
class RequestTimeout extends Error {}
class FileTooLarge extends Error {}
class NotImplemented extends Error {}
class ServerError extends Error {}
class DuplicatedFile extends Error {}
class CorruptedFile extends Error {}
class LockException extends Error {}
class LegalReason extends Error {}
class FilenameInvalid extends Error {}
class SensitiveFile extends Error {}
class NotAuthorized extends Error {}

app.post('/upload/:fileSize', (req, res) => {
  const cloudStorage = new CloudStorage(1000); // Capacité de stockage fictive de 1000 unités
  const fileSize = parseInt(req.params.fileSize, 10);

  try {
    const result = cloudStorage.uploadFile(fileSize);
    res.send(result);
  } catch (error) {
    if (error instanceof NotAuthorized) {
      res.status(401).send(error.message);
    } else if (error instanceof StockageInsufisantCloud) {
      res.status(507).send(error.message);
    } else if (error instanceof FileNotFound) {
      res.status(404).send(error.message);
    } else if (error instanceof ServerDown) {
      res.status(504).send(error.message);
    } else if (error instanceof BadFileType) {
      res.status(400).send(error.message);
    } else if (error instanceof TooManyRequest) {
      res.status(429).send(error.message);
    } else if (error instanceof RequestTimeout) {
      res.status(408).send(error.message);
    } else if (error instanceof FileTooLarge) {
      res.status(423).send(error.message);
    } else if (error instanceof NotImplemented) {
      res.status(501).send(error.message);
    } else if (error instanceof ServerError) {
      res.status(500).send(error.message);
    } else if (error instanceof DuplicatedFile) {
      res.status(100).send(error.message);
    } else if (error instanceof CorruptedFile) {
      res.status(500).send(error.message);
    } else if (error instanceof LockException) {
      res.status(423).send(error.message);
    } else if (error instanceof LegalReason) {
      res.status(453).send(error.message);
    } else if (error instanceof FilenameInvalid) {
      res.status(400).send(error.message);
    } else if (error instanceof SensitiveFile) {
      res.status(400).send(error.message);
    }
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
