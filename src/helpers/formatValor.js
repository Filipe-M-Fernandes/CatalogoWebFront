export default function formatValor(valor, lista = false, cifrao = true, casasDecimais = 2) {
    if (!!valor) {
        let negativo = false;
        if (lista) {
            valor = valor.toString().replaceAll(',', '.');
            valor = parseFloat(valor).toFixed(casasDecimais);
        }
        if (valor < 0) {
            negativo = true;
        }
        valor = valor.toString().replace(/\D/g, "");
        valor = valor.toString().replace(new RegExp(`(\\d)(\\d{${casasDecimais + 6}})$`), "$1.$2");
        valor = valor.toString().replace(new RegExp(`(\\d)(\\d{${casasDecimais + 3}})$`), "$1.$2");
        valor = valor.toString().replace(new RegExp(`(\\d)(\\d{${casasDecimais}})$`), "$1,$2");
        if (negativo) {
            valor = '-' + valor;
        }
        if (cifrao) {
            return 'R$ ' + valor;
        } else {
            return valor;
        }
    } else {
        if (cifrao) {
            return '0,00';
        } else {
            return '0,00';
        }

    }
}