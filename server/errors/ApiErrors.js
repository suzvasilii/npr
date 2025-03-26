
module.exports = class ApiErrors{

    static internalError() {
        return "Произошла внутренняя серверная ошибка. Для более детальной информации посмотрите логи";
    }

    static badRequest(message =
                      "Проверьте входные данные. Возможно вы заполнили не все необходимые поля или заполнили неверно"
    ){
        return message
    }

}