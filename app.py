from flask import Flask, abort

app = Flask(__name__)

class CloudStorage:
    def __init__(self, storage_capacity):
        self.storage_capacity = storage_capacity

    def upload_file(self, file_size):
        if not isinstance(file_size, int):
            raise NotAuthorized("Non autorisé. La taille du fichier doit être une valeur numérique.")
        if file_size > self.storage_capacity:
            raise StockageInsufisantCloud("Stockage insuffisant sur le cloud.")
        elif file_size == 404:
            raise FileNotFound("Fichier non trouvé.")
        elif file_size == 504:
            raise ServerDown("Serveur inaccessible.")
        elif file_size == 400:
            raise BadFileType("Type de fichier incorrect.")
        elif file_size == 429:
            raise TooManyRequest("Trop de requêtes.")
        elif file_size == 408:
            raise RequestTimeout("Timeout de la requête.")
        elif file_size == 423:
            raise FileTooLarge("Fichier trop volumineux.")
        elif file_size == 501:
            raise NotImplemented("Non implémenté.")
        elif file_size == 500:
            raise ServerError("Erreur du serveur.")
        elif file_size == 100:
            raise DuplicatedFile("Fichier dupliqué.")
        elif file_size == 423:
            raise LockException("Verrouillage du fichier.")
        elif file_size == 453:
            raise LegalReason("Raison légale.")
        elif file_size == 998:
            raise FilenameInvalid("Nom de fichier non valide.")
        elif file_size == 999:
            raise SensitiveFile("Fichier sensible.")
        elif file_size == 1000:
            raise NotAuthorized("Non autorisé.")

        # Simuler le téléchargement du fichier
        return "Fichier téléchargé avec succès."

class StockageInsufisantCloud(Exception):
    pass

class FileNotFound(Exception):
    pass

class ServerDown(Exception):
    pass

class BadFileType(Exception):
    pass

class TooManyRequest(Exception):
    pass

class RequestTimeout(Exception):
    pass

class FileTooLarge(Exception):
    pass

class NotImplemented(Exception):
    pass

class ServerError(Exception):
    pass

class DuplicatedFile(Exception):
    pass

class CorruptedFile(Exception):
    pass

class LockException(Exception):
    pass

class LegalReason(Exception):
    pass

class FilenameInvalid(Exception):
    pass

class SensitiveFile(Exception):
    pass

class NotAuthorized(Exception):
    pass

@app.route('/upload/<file_size>', methods=['POST'])
def upload_file(file_size):
    cloud_storage = CloudStorage(storage_capacity=1000)  # Capacité de stockage fictive de 1000 unités
    try:
        file_size = int(file_size)
        result = cloud_storage.upload_file(file_size)
        return result
    except StockageInsufisantCloud as e:
        abort(507, description=str(e))
    except FileNotFound as e:
        abort(404, description=str(e))
    except ServerDown as e:
        abort(504, description=str(e))
    except BadFileType as e:
        abort(400, description=str(e))
    except TooManyRequest as e:
        abort(429, description=str(e))
    except RequestTimeout as e:
        abort(408, description=str(e))
    except FileTooLarge as e:
        abort(423, description=str(e))
    except NotImplemented as e:
        abort(501, description=str(e))
    except ServerError as e:
        abort(500, description=str(e))
    except DuplicatedFile as e:
        abort(100, description=str(e))
    except CorruptedFile as e:
        abort(500, description=str(e))
    except LockException as e:
        abort(423, description=str(e))
    except LegalReason as e:
        abort(453, description=str(e))
    except FilenameInvalid as e:
        abort(400, description=str(e))
    except SensitiveFile as e:
        abort(400, description=str(e))
    except NotAuthorized as e:
        abort(401, description=str(e))
    except ValueError:
        abort(401, description="Non autorisé. La taille du fichier doit être une valeur numérique.")

if __name__ == '__main__':
    app.run(debug=True)
