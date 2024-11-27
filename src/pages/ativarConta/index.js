import React, { useState, useEffect } from 'react';
import { SendOutlined, UnlockFilled } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, Modal, Row, Typography } from 'antd';
import api from '../../services/api';

export default function AtivarConta() {
    const [form] = Form.useForm();
    const [dadosUsuario, setDadosUsuario] = useState({});
    const [senhaValida, setSenhaValida] = useState(false);
    const [carregando, setCarregando] = useState(false);
    useEffect(() => {
        carregarUsuario();
    }, []);

    function carregarUsuario() {
        let url = window.location.href;
        let dadosUsuario = atob(url.substr(url.lastIndexOf('/') + 1)).split('|');
        api.get(`Usuario/RetornaUsuarioEmail?email=${dadosUsuario[0]}`).then(
            res => {
                if (!!res.data) {
                    if (!!res.data.usu_ativo) {
                        Modal.warning({
                            title: 'Atenção!',
                            content: 'Usuário já está ativo!',
                            onOk() {
                                voltarLogin();
                            }
                        });
                    } else {
                        setDadosUsuario(res.data)
                    }
                }
            }
        ).catch(
            erro => {
                console.log(erro);
            }
        )
    };

    function ativarUsuario() {
        let dados = {};
        dados.usu_email = dadosUsuario.usu_email;
        dados.novaSenha = btoa(form.getFieldValue().usu_senha);
        setCarregando(true);
        api.put(`Usuario/AtivarUsuario`, dados).then(
            res => {
                Modal.success({
                    title: 'Aviso!',
                    content: 'Sua conta foi ativada com sucesso!',
                    onOk() {
                        voltarLogin();
                    }
                });
            }
        ).catch(
            erro => {
                console.log(erro);
            }
        ).finally(() => {
            setCarregando(false);
        });
    };

    function validarSenha() {
        let usu_senha = '';
        let usu_confirmaSenha = '';
        if (!!form.getFieldValue().usu_senha) {
            usu_senha = form.getFieldValue().usu_senha.trim();
        }
        if (!!form.getFieldValue().usu_confirmaSenha) {
            usu_confirmaSenha = form.getFieldValue().usu_confirmaSenha.trim();
        }

        form.setFieldsValue({ usu_senha: usu_senha, usu_confirmaSenha: usu_confirmaSenha });
        if (usu_senha.length >= 6 && usu_senha === usu_confirmaSenha) {
            let letrasMinusculas = /[a-z]+/.test(usu_senha);
            let letrasMaiusculas = /[A-Z]+/.test(usu_senha);
            let numeros = /[0-9]+/.test(usu_senha);
            if (letrasMinusculas && letrasMaiusculas && numeros) {
                setSenhaValida(true);
            } else {
                setSenhaValida(false);
            }
        } else {
            setSenhaValida(false);
        }
    };

    function voltarLogin() {
        setTimeout(() => {
            window.location = '/#/';
        }, 2000);
    };

    return (
        <div className="login-container">
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={ativarUsuario}
                layout='vertical'
                form={form}
            >

                <Card className="login-card">
                    <Row align="middle" justify="center" gutter={[0, 8]}>
                        <Col>
                            <img src={"data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEoWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI0LTExLTI2PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPjNmYmY2Y2I5LTJkYWItNDRmNi05YmIxLTNkZTkyNjJmZmFlYjwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5ib3JjZWxsZSAtIDE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+RURVQVJEQSBMVcONWkEgR09ITEtFPC9wZGY6QXV0aG9yPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmEgKFJlbmRlcmVyKSBkb2M9REFHWEMwRXk4RGcgdXNlcj1VQUdTTENibUtNSTwveG1wOkNyZWF0b3JUb29sPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz6AbBbxAAA13ElEQVR4nOzdXahsZR3H8Z/RRWoR4UuWmSEtlSAzX26iLNMLqVy+BCXUoToGiwQNlSIv7CIii6QQslgX+QJK9CLWShNJQwlLURNPpsTiFKSpQXHKU9RlF2tLIftt9sx29L8/H9hs2HvN/3nuvjPMzLMOCADwsnfAsjcAAMxP0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBB4ACBB0AChB0AChA0AGgAEEHgAIEHQAKEHQAKEDQAaAAQQeAAgQdAAoQdAAoQNABoABBh5epphsOTnJqkpOSHJPkDUneuPL76A0e/rckTyd5ZuX3U0keS/Lg2Ld/2K49A9tH0OFloumG45K8P8m7kpyS5PhtWmpfkoeSPJDknrFv796mdYAFEnR4iWq64bVJPpjkrCRnZnrlvSx3Jbk7yW1j3z62xH0AaxB0eIlpuuGMJLuTnJfkwCVvZzW/SXJdkpvHvv37sjcDTAQdXgKabjgkycVJLkzypiVvZxY3J/nO2Lf3LXsjsNMJOixR0w3HJPl8kk8kedWStzOPXyX5+ti3P172RmCnEnRYgqYbTkxyZZLzl7D8n5N8P8n+JIcmaZK8O8lBC5j9xyRfHvv2ugXMAmYg6PAiarrhLUmuSnLBEpa/Pcm3x7792Wr/bLrh/ExPMk5cwFq/T3Ll2Lc/XMAsYBMEHV4EK++RfynJRUvawkfHvv3BZi5suuGKJF9Z0Lr3J7l07Nv7FzQPWIOgwzZruuGsJDcmOXxJW/jIrK+Um264PMnVC9zD1WPffm6B84AXEHTYJk03vDpTFLslbuMbY99evpUHNt1wb5LTFriXPUkuGPv2iQXOBFa8YtkbgIqabjglye+y3Jjv22rMV1y6sJ1MTkjyeNMNn13wXCBeocPCNd3wySTXv0jL7Uvy2ySPJ3kyyXMrP/uT7B37ds9aD2y64fgk/xz79ql1rvlFktMXuuPJTWPf7tqGubBjCTosUNMN1yS5ZBuXeCLJbUl+nmTP2Ld/mXVA0w2vSXJrkjNW/nTz2LcfX+PaS5Jcs8W9buThJOeu94QC2LxXLnsDUMFKJH+a5L3bMP7BJDdkOkf9TwuYd1n+F/Mk+VjTDbePffu9Va4dF7DeWk5O8kjTDR8a+/aBbVwHdgRBhzk13XB4plfMJyx49PVJrh379uEFz339Kn87Zo1rt/us9kOT3N10wznu6gbz8aE4mEPTDUcluS+Li/mzmQ53OWzs293bEPMkeeH30f+T5EdrXLvZO7ztzXRgzvuSHJnp1LmTknwmyZ0bPPbgJHc13XDeJtcCVuE9dNiiphuOTXJvkiMWMO7RJN8c+/bGBczaUNMNuzLdCCaZjmq9a43rrkryhXVG7ct0cMy6+2664e1Jrk3yng22tmvs25s2uAZYhaDDFqy8Mv91plej8/hHksvmPfu86YYTkhyf5NhMTzAOS/KvsW93zzn3iZW5q9mb5PSxb5+cYd51ST61wWXnjn37k83OBCaCDjNaOcb1viTHzTnqziS7x759esb135nknCTvSPK2TBFfy5lbfW965Wz3W9a55KSxbx/ZwtxHs/FbFKeNffvLWWfDTiboMIOmGw5Kck+SU+cY8+8kF499+90Z1n1rkl2ZbuqyXsBf6MlM4f3rLBtsuuHQJA8lOXqNS7469u0Vs8z8v9mnZPrk/nqeyxT1R7eyBuxEgg4zaLrh9iQfmGPEQ5mOP927ibUOTPLpTPdKP3mONR9McvZmv7PedMNhSe5YZ839SY4c+3b/VjfUdMOQ5OwNLns205ORZ7a6DuwkvrYGm9R0wxczX8y/Nvbteh8we36d12U6dvWiJIfMsd7zTk2yp+mGC8e+vW2DtT+c5FtZ/4N+t6wV86Yb3pzpe+5HZToN7tY1ZtyQjYN+RKb7ti/yPHko678AAAD//+zdd7weRdXA8V/oNUDoJfQhdBCQGop0kAxKVToqDP21AaIIAi/SBaSOFAOEIvCiDF1KgEio0pQ69NBbgNAMEN4/Zi/e3Ozs82x5+vl+PvejPLs7e3Jvcs/ulDPyhi5EHZRxm1J7+VWW7b3VsaVh/e+zH3AMMKTEvbLcD1wFPAI84q0en9x3N+BQwph8Lft7q88e+GHyZv8kYW15nz3SZsAr4+YH6p07cIq3+pd1nitEz5KELkQNyrhFgYeBOQpc/jmwtbf67zXusSJwGbBcgXs02+7e6osHfpisI79mwMc3eKu3SmtEGfd1jntu563OmqAnRM+TwjJC1PYXiiXzCcD6dSTznxPWoXdCMgeYLvL5xJTPJlV0zwuUcWkV7oQQCUnoQmRQxu0PrF7g0s+ATb3VD2S0PUQZdwtwStH4WiR17b23+gbChiv9HZ92rjJuiZz3nA34U85rhOgpktCFiEgmeJ1c8PLtvdX3ZbS9BmG/9E0Ltt9KWdXeNgaOBI4Chnurx0bOK7KJjVbGbV/gOiF6goyhCxGhjLuNyXclq9ePvNXR/dCVcSMAVziw9jCPt/qdohcr4+6i2Oz1t4GlvNUfFr23EN1K3tCFSJFM8CqSzI+rkcz3oPOTOcDhJa+/q+B18wD/W/LeQnQleUMXIoUy7hnyVWQDuMdbPTyjTQ10U43yTb3Vtxa9WBl3LaALXr64t/rFovcWohvJG7oQAyjjfkL+ZP4hoSxrrM316a5kDvDXZPigqB8Q1sMXcUyJ+wrRleQNXYh+lHEzAC9Q/z7gfbb0Vt8UaXNJQsnX2UqG164uAo4q8sasjFsAeAoYXOC+K3mrHy9wnRBdSRK6EP0o4w4CTs952Shv9a6R9uYAHgCWLBtbB7gMuBj4DzAjsDywAaFy3He81Z+mXaSM2wW4pMD9rvFWb1ssVCG6j3S5CzG5/8l5/sfAwRnHL6U3kjnATsDNwGjgRuBEQu371YErYhd5q0dRbKLgNsnSQiEEktCF+EYyHrx4zssO91a/GWnvx8AWpQPrDiOUcSdmHP8x8H6BdvcrGI8QXUcSuhD/dVDO85/yVqd2zyvjFgL+WD6krnKwMm7jtAPJfu2/K9DmXsk2s0L0PEnoQgDKuGUIVc7yyFoPfQYwU/GIutYlyrjZ0w54q88AXsnZ3hDgh6WjEqILSEIXItgt5/mveKsvSzugjNsC+F75kLrSfMBZGccPLdDm7gVjEaKrSEIXIsj7lndsxrHTygRSgTeBkwg9DhsCewAnEHZ0awc7KePWTjvgrb6C/HGulwxxCNHTpml1AEK0mjJuHWCRHJe87a1O3flLGbcj+YvSVOUx4Fhv9VWR479Sxq0G/B7YpHlhpToZSE3qhNnxl+ZsbwfgD6UiEqLDyRu6ELBzzvMvzzj2mzKBlDAaWCsjmQPgrX7IW70pcEhzwopaSxmXOiyRDGW8nrM9GUcXPU/e0EVdku0+lyFUUHsXGAfc5a3+rKWBVSPvePeotA+VcWsCK5QPJ7d/AiPy/Cy81Scp44YCBzYurJqOBP4WOfYH8m1du5oybmFvdd5JdW0n+be2JLAA8BnwHDDWW/1RSwMTbU8qxYkoZdwihElKPwTSZia/C5wNnOytntDM2KqS/BlfynHJs97qYZG2TgF+XkVcOXwCLOetfjnvhUmZ22eAVhZn2dBbPXrgh8q4wYT6+HmY2FBIJ0j2ej8M+FbklFuAE73VdzQvKtFJpMtdpFLGbU1IdPuSnswhlPQ8ArhfGbdYk0Kr2po5z88qUbpdmUAKOq9IMgfwVn9O+W1Qy0p9AEreRm/I2VbeZYdtQxl3IXAl8WQOsBlwuzIua5WA6GHyhi6moIzbFrg652XjgbW91U83IKSGUcadRr5yr6t4q4vuENZUyrhhwFbAY97q2zLO+4DWbhyzSFpXuTJuV0Jt+HqN91YPqS6s5lDG3QF8J+dlI73VezYiHtG55A1dTEYZtzr5kznAHMANyWYknSTPG/r4DkrmuwJPE8ahb1XGpY77J6bo8m6yWM9G3vrucySz+DuGMu588idzgD2Uca2agCnalLyhi8ko4x4CVm11HG3qam/19q0Ooh7KOM+Um8Is5q1+KeXcvL0UVRvrrV4n7YAy7lY6uCu9CRb2Vo9rdRCiPcgbuviGMm5VJJlnubXVAeQwKeWz2KqWLxoZSB3WTvZFT3N3UyPpPPu0OgDRPiShi/6KdP31kgdbHUAOvx/w31d4q5+LnNsOW5DG/u6NaWoUnWerVgcg2ockdNHf0FYH0OaebXUA9fJWXwT8ALge+J23OqvwyrrNiSrT8MjnDzQ1is6zYqsDEO1DxtDFN5KlMzJzNt04b3Xqm2yyz/fqTY6nz2Vl1l4r49YD7qownqKe8FYvn3ZAGfdPYJUmx9NJpvVWf9nqIETrSaU40d/HrQ6gjT2TcWxLYLlmBTLAMGXc5SUK+xxXaTTFLaeMm8lb/WnKseeRhJ4lbb6E6EHS5S76y1s/u5e8kHFsiaZFMaX5gAuKXKiM+zXxDVJaIfZ9zPre97rx3mpJ6AKQhC4md0+rA2hjn6R9qIybC5ihybEMtL0y7vQ8FyTJPGsL2FZYNPJ5bDKfCHMkhAAkoYt+vNVjgLdbHUeb+k/k87maGkXcQcq4e5RxA9eeT0YZt1pSmazdkjlMuW6+z0vNDKLDZJUiFj1GxtDFQCcT9qMuagydMaY3Fflmd8fWas9SQSxVWRvwyrhLCdXfHgP+TeiWX41QPCY2m7wdzBf5fHzOdl4CCtW3b4FlgbkLXvuQt7qTaiOIBpOELiaTbKu5FbBegcuP9Va3erOPuijjZgXybEcZe0Nvp4TeZ2fy7/HeDgZHPs874W+kt/qossE0gzJuJeBeYMacl74P7Fp9RKKTSZe7SDOC/GNzZ3dKMk/kfZidOvJ5J/RGdIrYBjF5t1GN/azajrf6MWBHInM0Il4gbDvbURshicaThC6m4K3+yFs9AtiP2m+xLwFbeav3b3hg1cpb7nTmyOdpy6xEMbGEnqcnBeDrsoE0k7f6OsKyx1vqOP0cYKXkQUCIyUiXu4jyVp+jjPsboft2U2AYYbzvYWAs4LzV/2hhiIV5qz9WJtdmXrGELmv3qxN7yMr7e+qzsoE0W7Kn/ebKuIUJFf7WJ+wE+DWhBsJdwF8kkYssktBFJm/1G4SJcie3OpYWi42V5+kqbYWbgOuA+4CnvdWfJUljD2BvYMEWxjZQ7HuZd55Cx/aaJPvCn0i5iamiR0lCF73sY+pPFkPSPvRWj8v5pt8so4EDvNVPDjyQJI2jgaOVcTsC5wKzNzm+NLGEPmvOdj4vG4gQnUgSumg5ZdxGhC7GpQiJ5TVCMZHzvdXvNPDWH1J/Qs+qBvcc8TXUrXCmt/rAek70Vv9FGfc0Yblh3sRZtfcjn+d9Q887iS43ZdwswI8IY98LAhMBTyjOdFukhK0QDSUJXbSMMu5XwC+IF2f5vTLuLOA33upG/JJ+jfq7nBfPOOZpn4R+b73JvI+3+jFl3PeB2xoUU72ej3yet/fg1bKBZFHGHQH8kvgD0KfKuDMJyzjzTugTojCZ5S6aThk3qzJuNGFjkFqV1vYHnlDGbdCAUMblOHcGZdz8kWNTdGu3UKHd8rzVtwPHVxxLXrESr3kflvL8XOumjFtBGfckcBTZvRkzAYcAY5Rx8zQiFiHSyBu6aCpl3AzAzeTbFGRB4CZl3JoVz/J9Lef5w4A3Uj5vlz27L/RWZ+0Kl8lbfZgyLlZApxkej3y+dJ5GkjkClVLGLQjcQb5SvysCo5Vxw73VeavdCZGbJHTRbGdRbIevGYDrkj3bq7JCzvPXBu5M+Xxs+VAqEd11TRm3DbAL4e31ZG916lust/p3jQmtlGE5zv1MGfe7BsSwNcXq9i8LjEyuF6KhBrU6ANE7lHGrAP9sdRwl3OSt3jLtgDLudSDWJd8U3urUf8/KuB8D5/f76B1gWKe8NSrjnqO1W9RWYUNv9ehWByG6m4yhi2YqNL7bRrI2c7mhaVGky1qq9cMB/z03sFEDY6lMsj1tpydz6Py/+6IDSEIXzbR5qwMoaRZl3GqRY5c1NZIpZe3JnjamnDYXoB19p9UBVGSLVgcgup8kdNFM7bK0q4xt0j5MulPfbHIsk1HGqcihI5g8tvO81fc0IaQqbNzqACoylzIutTiREFWRSXFC5LMD8OvIsYuAQ5sYy0AbE9bET8Zb/aoybmVgGeArb/WYWAPKuPVo/oP+c97q2NrxTZoaSWMNIV48R4jSJKGLZnoVWKjVQZS0hDJuZW/1oynHLK1N6LsTduOagrf6LeCtrIuTtf6tmLi1MinFYJRxSwOLNT+chnm91QGI7iZd7qKZOnmGe387pn3orX4RuLHJsfS3RrI8LbekPsAZFcdTjwczagvs1NRIGuspKQcrGk0Sumimv7U6gIr8JOPYmU2LIt1IZdwyRa4Dlq84lnqcnXFs16ZF0XjXtDoA0f1kHbpoKmXcy8DCrY6jArt6q0elHVDG3UnYbKZV3gV29FbfUevEpDTpJYT97pvtdW91ai19Zdw6wD+aHE+jTAAW81a/1+pARHeTMXTRbHsTSr8W8U/CphhVm5H8XeUHAKkJPTn2r1IRlTMXcLsy7krgGG/1vweeoIyblTDmfhSRrWGb4ISMY3vkbGskYVJio+xLmBBZxM8kmYtmkDd00XTKuGOAw3Ne9hqwmre6IUvDlHHXA9/Nedna3up7I+2dCvy0dGDVuIn/1ptfHFiJUGe8lcYBS3mrpyiIk2yCk3cC2TLe6qcriSyFMm5Gwhazq+a89CJv9R7VRyTElGQMXTSdt/q3hDewCXVe8jSwbqOSeWJkgWtOyzj2G+DFYqFUbgvgyORrV1qfzAEOSkvmiZ/nbOv+RiZzAG/1Z4QldHfnuOyXksxFM0lCFy3hrb6IsHHF1RmnvUeYeb1aMoO8kfFcDeStbb66Mi514lYyo3mX0oF1p5u81akTJJPiKwfkbC+6KU2VvNXjvdXrA0eTXn2vz02E3odTmhGXEH2ky120nDJuZsJOZksCsxG611/0Vjd1UpQy7nTgoJyXvQEob/UnkTaPJV6IphdNIHSPp25dW2A45hNgAW/1R1UEl4cybnXC39kFgInAs8DYVsQiBEhCF+IbyrjFgBcKXHqmt/rAjHbvAtYrHFh32dNbPTLtgDJuceD5nO2d6q3O20UvRFeSLnchEkm3/pUFLj1AGZe1icg2ZHfR9oorY8k8cVaBNk8tGIsQXUcSuhCTO6ngdRcnS8GmkCxZ0sCFwJaEdfgzESan7UHrt15thofJWIqmjNua/LvxjfJWjysTlBDdRLrchRhAGXcHxbbtHOWtLlTdLKlbfgbds7tYf+OA1WOrFJRxcwCPk7/O/wppa+yF6FXyhi7ElIpOYttFGWeKXOitftpbvQnZpVA70YfA5jWWHF5C/mQ+SpK5EJOThC7EAN7q+4ArCl5+rjLu2yXuvT+QWqymA30KbOGtfjJ2gjLuZ+Qv6PM5cEiZwIToRpLQhUhXJmE4ZdzcJa7fq8S17WI88J1YJT0AZdwawB8KtH2it/qNwpEJ0aUkoQuRIplsdVzBy+cDFilx7yeAS4te3wbGAet4qx+InZAsUSuy1exrZNeAF6JnyeYsQsQdDWwHqJzXPemtfijtgDJuPsIGM0sAV3urY4n7YmDnnPdtBzcBu3ir34+doIybE/g7xTaF+bHsKy5EOnlDFyIiqTVepHzr6LQPk2VtDwK/AL4HjFLGxcqcduI4+mHe6i1rJPNZgFsJDzR5neetvqVwdEJ0OUnoQmRIuo2PzXnZS5HP12TK2dzbR+47gVDWtBN4YEVv9fFZJynj5gXuBL5V4B6vAD8rcJ0QPUMSuhA1eKsPBx7LccmXkc/Tdhf7qkA7Ma8B9wB3AR/nvLao4wjJPHP/d2XccoTeibzbj/bZOVYvXwgRyBi6EPXZBngUSK0GN8CCaR96q8ckdd3X7/dx6sS7pHt+tjrudS9wDnC9t/qb3eKS/bu3B/YB1qqjnbz+DzjEW12z9r0ybjPgKur73qU5rNkb9QjRiaRSnBB1UsZtQ0hktTzgrV4j0sYswE8JD9N3e6vviJw3AnAZ9xgP7Oatvr5WMMq4jYBrgZlrnVuHC4GT6t1/XBl3OHBMifvd4q3OWxJWiJ4kCV2IHJRxZwL713Hqot7ql0vc52IgVkb2Q0I3d90bvijj1iZ0xxfxAaGC3Rk1Kr71v9/MwCjC5L+iXiX8OfPuUy9ET5KELkROddZ6H+mt3rNg+8sCT2Sc8l1vde413Mq4nQlJth7PAHckXzd4qz/LcZ9vE8q5DssbYz8TgA281Q+XaEOIniIJXYickrfP24HUbvV+tvdWX52z7cGEcfFlI6dc563Wedoc0P5NpO9q9ijwEGFJ2Z3e6rcLtD2EMCdg76LxJT4FNpNxcyHykYQuRAHKuNkIS7BWzjjtc2B3b3Vde6wr4+YnjNFnTWJbtcxbqzJuBcKObu8AbwIveaufK9pev3Z/AhwPzFm2LWATb/VtFbQjRE+RhC5EQcq4uQhJfbkap14KHOWt9hltHQgcAcyV0c6z3urUbuyklOofgfWAMcAB3uoXa8RVWtKNfyT5q+nFbOWt7oX94YWonCR0IUpIkvqtZL+p97kK+DPQfzx6PeBAshN5n+u91SMicfybyR8sHvZWF13zXZMybidCIl+qoiY/B77vrb65ovaE6DmS0IUoSRk3ByGpNyyBJq7yVu+Qcv+ZSS8kM0uVxViUcfMQ1rXvB8xbVbuEZL6Ft/rOCtsUoudIQheiAslkthuBdRp4m9He6g0j938cWKHfR//2Vq+Qdm4eyrhFCJP/tgZ2Ktteig+BLb3VYxvQthA9RSrFCVEBb/VHwHBl3OnAQQ26zTIZx3YA7gbmJpSA3S5v48q4hQnd9ssS6s6vA8yfP8y6PQps04yxfiF6gbyhC1ExZdyOwAVUU5ltoG95qx/NuPcqhO1b0+rGo4ybHdiEsEnMQsBQYGFgeRoTb4z1Vu/TxPsJ0fUkoQvRAMq4ZYArgBUrbvp8b/VeRS9Wxp1M2L61VT4G9snYB14IUZAkdCEaSBn3W+DoipsttBZdGbc8kLkrWoPdAOzlrX6jhTEI0bUkoQvRYEkp14upbhb8m8Ba3uqXcsQwN2H70kUqiiGP94GD5K1ciMaShC5Ekyjj9iLsPFbFkq/3gV3rqemujFsLuJzWJPOzgd96q99vwb2F6CmS0IVoomTN+OHArypq8h7g+LRtVJMlZ78gFK5ptquBX3mrn2/BvYXoSZLQhWgBZdxQ4FDq24q1Hh54vd9/L0pr3shvAY71Vo9pwb2F6GmS0IVoIWXcvIS36H2BWVocThl/BY7xVj/S6kCE6FWS0IVoA0n52L0IpVUXa3E49fqIUJv+HG/1M60ORoheJwldiDajjNsQMITqb+1oLKEwzMWtDkQI8V+S0IVoU8q4WQl7l2+WfC3aolDGA7cTxsdv9Fa/XuN8IUQLSEIXokMk69nXBlYBhjP5ZixVegm4H3gI+Ie3+r4G3UcIUSFJ6EJ0KGXcjIRiNYsACwILJP87NzA7MGu/rxmAD4AJhLHv8YS17K8RZse/BrwK/FPWjAvRmSShCyGEEF1AEroQQgjRBSShCyGEEF1AEroQAmXclsC5kcPDvdWvNDMeIUR+07Q6ANE+lHGDgMHAl97qT1odj2iqmYChkWPye0KIDiD/UHuUMm4uYFvCMqgVgcUJs6EHJccnAW8BzxCWL90AjPFWf9WSgIUQQmSShN5jlHHrAr8BNiL75z8VMH/ytQHwS2CcMu5c4DRv9acNDlUIIUQOU7U6ANEcyrhFlHE3A3cTqo4VeZgbChwLPK2MG1FlfO1KGTenMm77VschhBC1yBt6D0gS0p8IxUaqMBS4Vhn3O2/10RW12TaUccsBWwPfBdYAPgGuamlQQghRgyT0LqeM2w84k+pXNAwCjlLG/cdbfULFbbdE8uBzAp2z25kQQnxDuty7mDJub+pP5uOBJ4A7kq9HCW+mtRyXjMt3g5WRZC6E6FDyht6llHGrAX8kO5l/RuiK/4u3+t6UNqYC1gL2AHYh1AMfaBBhkt3mJUMWQghRgiT0LqSMmw64Apg+47Tbgb291S/ETvBWTwLuAe5Rxv0eGAmsN+C0x4E9SwUshBCiNOly706/BJbIOH4tsFlWMh/IW/0isCFwab+P7wLW9Va/UShKIYQQlZGE3mWUcbMBh2accj+wQ5ECMck1uwG3AVcDm3qrPyoUqBBCiEpJQu8+exDKt6b5CtjXWz2xaONJN/y2hIeCwu0IIYSoloyhd5+fZBy7yFv9SNkbNOqtXBm3NKFbf3lgUWC25NAHhFn4jwP3Afd6q78oea/FCVXw+lsocvrUyrh1ajR5XxVlcZVxMwPrEyYjKmBewmTETwnfh1cJvSxjvNXjyt6vHSjjZiJUI1wPWACYE5gD+Bh4N/l6ALjNW/1mk2IaQqhDsA4wT/I1CXgbeBK42Vs9NuW6tL8nz3qr36kwtqmA1YGNCasy5ky+viR8r95LYvy7t/rpqu4r2p8k9C6SJKnlM045r1mx1EsZNxjYD9gdWLrG6Tsn//uWMm4kcJK3+r2Ctz4U2LvOc2cG/lHjnCGEh45ClHHDgYOArYAZ67jka2Xc7cCp3uobi963lZRxqwNHAJsA09VxydfKuMeBE4HLvdVfNyCmRYGTgO8R//24LfBbZdxTwEHe6tuSaxci/e/JnoQJpWVjG0pYUfID/vuwW+ua1wi76J3mrf64bAyivUmXe3fZLOPYC97q+5oWSQ3KuKmVcT8HXgGOo3Yy729eQkJ+Qhm3dSPiaxZl3NJJYh4DbE99yRzCcsGNgRuUcZcr46qqAthwyri5lXHXEXoavkt9yRzCn3klwsTMJ5Vxa1Uc137AU8B21Peyswzwd2XcWclb85JVxtMvrqmVcScDzwGGOpN5YkHgGOBFZdxejYhPtA9J6N1l4JKy/m5vWhQ1KOMWINSUP4V8v5wGmhe4Rhm3SyWBNZkyzhAK+GxYsqkfALcq42YtH1VjKeNWJuzet1XJppYGRivj9igdFKCMOxQ4i/RaC1kGEXqYTgGWqiKWAXENIUxC/QX1P/ikmQv4U/LwMXUlwYm2Iwm9u2S95T7etCgyKOOWBO4lbNtahamAC5Pu246RrOs/l+xaAXmsxuRLCttOUiP/bmDhipqcHvhz8mBUmDJOA8eXjOWnyVdlkvkUdxHmF1RlP+CSCtsTbUTG0LtL1trz0pPhKjIEmC9y7HNgNOGNZBzwBjA1Ya/27xI2TEn7OzstcDphIlm97kz5bDVglZTPJ1J7DPQ/Oe4Nobs25jnC/vOPE74H4wmTnlYnLBtcNHLdCGXc5t7qm3PG0nBJ78E1QKwXYRJhKeSVhL+rbxE2E1qSMJ79I+KrN05Xxj3srX6wQFyzA+dknPIV4UHpUkJp5A8IPUPrEbq/1+x3btbPtIjzyJ4Tcy8hOY8GXie8wS8MbEEYt4/9PvihMu5+b/XpFcYq2kDVG3aIFkl+MWVNylrEW/1Ks+LJkoxVntXvow8Im6L8MWuf9WTM9DpCckuzepFf6v3aPxb4dcqhj7zVZYYG0u41mND1rPp9fAdwqLf6oYzrpiOU6909cspN3uotC8SzHfEd5ZbIU4Qo0v55xFdgvApsnzXHIxmmuYT48MTzwLC8Kw2UcUcDv40cfh/YKq0scr/rDyeMUWfZ01s9MmdcOxHvcZkI7OOt/nPG9TMQ5qbEeg0mAit4q5/NE5dob9Ll3j1iby992qYAjLf6bGBU8p93AUt6q4/PSubJdfeSXWZWVxRiwyVL/7YlLEebCOzsrd4oK5kn100kvK0+EDllA2VcvRPrmiKZ/b1b5PDbwAa1Jmx6q18n9NKMiZyyBP9dBVFvXFMR//v0JTWSeRLX/xKGTiqjjOvbHyHNJEINiGgyT+L63Fv9M8KM/TTTAYcVj1K0I0no3aPWhKi2SeiJvYGTgc3zLD3zVl8HxN4qVqwisGbxVv8L+DEwwlt9WY7rJhE23kkzIzCsgvCq9EviE7r+x1v9fD2NeKs/B3YlvgtgVoXENJsQrz1wQa1k3s8hwIc5751FA8tGjp3vrb42R1uHESZeptlJGbdgrshEW5OE3j2y5kN8mSSBtuGt/sxbfXDySzqv2FvsPGViagVv9RXe6r8XuDQr2cTmKLTK9yKfP+atviJPQ97qlwEbObysMi7Pw8zwjGN/yBHTBOLDFUVsF/l8InB4noaSIYjYkMJ0hHkpoktIQu8eWXuXT9Nu3bAlxd7oKx3nbnPvZhxrm++DMm4RYJHI4YsKNptVICnPEsBvRz7/V4Gx5btynp8l9qBxU8GKczcSJs2lyVrqKjqMzHLvHrWqQM1K2P+87Snj5iOsm501+Rr44BnrJu2aSZ7JpKahhLkRsxDWR/f/82Wtl26n78P6GcduK9Kgt/ppZdwbTFm6F2Bdsmet9xeblf5wgbCeKHDNFJL5BotGDo8u0qa3epIybgywY8rhWiWNRQeRhN493iMssYkVjRhCmIDUdpRxKwA7EN6uliHU8e4pyZrjEcD3gW8Rlup1QwGQ2JrzzymXBB8lPaHHHvbSxP6ePZU/HN4vcE2arDX6mRMma3iE9IQ+vzJuUCPK6Irmk4TeJbzVXyjjxhF/ul8OaKuNGpJlaCfRw28JSSI/GPg5tSc2dqLYEsN3Ss7reCvy+ZB6Lk5muM8SOfxBgXgyV2jkMFfGsTdKtBu7dmrCg01VDySihWQMvbtkzRZeqWlR1CFZ/zuW3k7mivCmeSTdmcwhnmDLrrqIJd26Ejphw53Y0EQrNzHJir/Ig0Y912Y9RIgOIgm9u2R1ya3atChqUMb9gfjM256Q7Oo1lgZt6NFGYoVeyg4nxHoXv6zz+k+AWDdzKyeQZhXGKfM9y1wFU6Jd0UYkoXeXrElGGynjWj77WRm3Edk1rx8ibESxLmEceZ6Ur7bbBraAi4i/GX1M+DNuTyj9uRBTfg8Wb0KMVYitSKhVCKmW2N/lurqOk+7+2Jt4K3tLsmoylNlRL+vfftaKCdFBZAy9u9xN+CWVNjY4PaEy2YVNjWhKh5He1fkFcIC3+k+1GlDGdcRs/Rhl3DrElwvdB2zjrc4cL1XGFVm/3wqxBDW3Mm6GgnUIID55LM9Y8AekJ++sPRFiZi5wTZqs5LoY4Au2u2jk8y+SqoWiC8gbehdJyoJenXHKwcq4lj3EKePmJL5z1In1JPMu8cPI5+8TqsaVmfzUbmIJaFrCbP6iYnNC6qo6l3gm8nmRioNzF7gmzXOE8q5pYuvm6xEbcnuxRJuizUhC7z5Za3CXBg4qewNl3O5J13leSxEfBzw7Rztl9oVuB7F9s//mra63+7NTvgejiSeoQnuiK+PWJd79fGeOpmIb+aypjMu7dLKS7Xu91e8DT0YOb1GkTWXcTIQhrDSx2viiA0lC7zLe6geA2zNOOTpZLlZIcu3ZwI3KuB/kvDy6bWqy+UbdYeS8b71iiWemiu8TK1GbZ0ezpasIpNGSBBVbb75rwR6jfTOO3ZGjnVj53GnJ3gQozfdznp8lVnVubWVckZ/7LsTnLBQqViPakyT07vQL4rNlZwauV8bl7r5Txm1OKCM5E+EN8VJlXNYEt4Fie4ZPX29pWmXcEjSuXGVsac80yX2rEvs+5Hkr3LuKQJoktvHMUHLu+JU8UKYVSAEYnXO44mYgVkr118kQUT0xrU++krO1XBz5fBBwRp6GkomwR0UOjwdcnvZEe5OE3oW81Y8Bp2WcMgS4Rxl3fFLYJJMybhFl3AXADUze1TkVcGqyj3hdoUU+HwRsU0ccg4ErCG9QjZCVDHao8D6xN/GtkoInmZRxOxN2HatS7CEDyk/4OpOQPNL8JnlQrEkZN5SwR3jse/T7PEF5q78g7LGeZk7Cg2+s+ExfTMOSmCort5v0ssV6GjZWxsUS9MDYpgUuJ94zdk6ysYzoEjLLvXsdCqwFrB05Pm1yzoHKuJsJv0BeJVTgmpbQLbw8YRLbulRQhtRb7ZNqdkNTDv9BGffv5GFkCsmb2QXE629TQYz3ZBw7TBl3m7c6Nu6axx1A2nDFMOAMZdxByS5Zk0nGQo8gbEealUCKfB9iCRfCJLF/FWgTAG/1x8q4k4G0B7/pgb8q434FnBGrHqeM25iwlG/RyG3u9lYXqQ1/GrAX6bPd1wQeV8YdArhk0mlfPEMIW9/+mnLLyWKOINTBT/tZHqGMmx842Fudum1r0qN0AfFa+u+SY0c50RnaaRMHUTFl3NyEMbLlGnibx4E1vdV1LSVL3i6OiByeCPyVsPzubULXvgI2JvxyreV1b3Wp/Z2Vcf8iPMik+QK4lpD4PyD8Ip+b8ND0oLf6kDrvMRh4mXgieBa4klBT/AtgXsIMZ51xTX/7eqvPrSeWfjHNQVhilvY74UVC0rufsCTyW4RtN/dPe/CItD+I0MW9acZpzxN+/o8SusIHE37+IwgPpzFvAavknIfRP7Z9qT0pcwLwUvK/cxGWttX74LSnt3pkgbh+Cxydccr7wHWEfy9vEB7EhxK+x5sRHpbSfAVsWXDbXtHGJKF3OWXcXMAtwCoNaP4lYLi3+rUc8cxK2M2qTIW0lwndwAMLs3wBTF9mowll3K7ExzCzXO6t3inHfepJIrU8SPpSpqO91UfmbUwZ9xD5KgoO91Zn9WoMbH8IYZ19lZMaPwW28FbfXaYRZdwVxMfm6zGJ8JCXVrq1aEIfRNhnfdsScaU51Ft9YsVtijYgY+hdLlkGtRZhMk2VOyqNBdbIk8yTeCYQ3jSLjt29DmxO+kYz0xLfe7su3upLKDZRqN4a4n33OQf4c4H79DmV+ISyolXkTs15/mZ5Tk5mvK9BvpnoWV4F1iubzBM7AaNKXH8IJYYl0iQPpjtQXdf4f4DdJJl3L0noPcBbPdFbfRAwnPiSmHq9CxwIrOutLrQdq7f6KcLYXt7d38YSuvefJr4UqorhhV0I3cN51DUjeoC9gePJrt890OfAgd7qnxOGO9IMKxAL3upLCZOo6pV7Yx1v9XhCl/CRZI/bZ/mSMHP+297qfxZsY2Bck4DdCOPib+a49B1CkjyFeG2Awg/S3upJ3upfEBL7c0XbIQwTrZs8sIouJQm9h3irx3qrNyC8sZ9FeNutx38Ib1V7AUO91WeW3PoSb/UjhGGA48iuXw1hTHV3QhfvuOSz2ASoMtXH+mKbAHwXOAAYV+N0COV26+567nefL73VhxEmHt5N9i/+TwiTnJb2Vp+ZXP8O8O+Uc5erZ7Z8xC6EZU5ZPSgfAZb0iX01eau/8lYfTShleiTh51vP36eXCRPjlvVW7+ytzpN464nra2/1hYTCP/sRlmimzQ35ivBweTAwrF+SjNWAL721qrf6KkLtgT0IxXPqKZk7HvgbsLG3enhFEzpFG5Mx9B6njFuYMG66BGEDh8GEyWkTCAn/SeBRb3VV+z2nxTANofdgVWB+Qtf5R4Rlbv/wVucpuFJ1bIOSuNYhzPyflfCA8xEh2T8BPOKtLr1jlTJuIUJyH0b4OXxBmOz0ODCmRN3zIrEMBjYizHCfg/BnfpuQfMfWOwkyx/2GEOoLLEiYGzE74SHmPcKktwe81WXeUIvGNYgwnDI/4Q38LeDNyCqE15PzBtqk4Az8rLhmIPybWZzw/ZqT0HPxHqHX4AngobIP3qKzSEIXQoiSkgeSWE/Tqt7qh5sZj+hN0uUuhBDlxeo9ALzStChET5OELoQQ5cWWLD6XY8MdIUqRhC6EECUkVdlim7PENoARonJS+lUI0fOUcdMmtd3zXjcdYfXBDJFT/i/j2qWA7/VfF66MWxFYu3+lv6Ts7Tze6ssGXD8nYTb+QG94q89Pud/PCJX+IEw4fAq4uUwhJtFe5A1dCCFgpDLuXmXcTjl2/pubUHo1Vi/dk12k6EvghGSlSZ99gT8mqwz6HEz6fuvzEUrDLp78/76vWE2Ewwj7MsxHKG98LnBLiSWOos3IG7oQoqcp4xYjFG6ZhrBnwGfKuNuBMYQyxU8T6qZ/TkiWyxLqy/+EsNQz5rist19v9QvKuFcJy/X6qtRtQlgSuTFwTbJs7tuE5Bvzmxx17C/2Vo+Cb5ZJjgNWAh6p83rRxiShCyF63WFM/rtwRmCr5Kuoq7zV9ZT2vYewnnxUMhY/H3AOobzxNYTKh7NTvsJjmr619JIHuoT8IIUQPSvZhnS3ipt9hFBCth5jCCWAITxAjCbsONf3xj4ceDKpgx+zqzLuo37/fXVSRTDNZslQwUzAD4ELpIJc95CxEyFEL5sVqKQefOIvhBLF9W4+dCehVO9gwmY3NxJ2pJtNGacI69v/UaON1QmJv+8rVoIWYAFCCdklCL//BycT+0QXkDd0IUTP8lY/C6yjjBtB2HRoA0Lp4bweIYyZX5Xz/k8o48YD3yFMWNvbWz0pGcPfkjCmX2sr3ANzjKH/ud8Y+nSEve73JNTmFx1OEroQoud5q68DrkuWgm1DSKQrAcsQuqcH+phQY/9u4BZv9Z0lbn8PsA/wgrf61eSzmwn7sy9BeIuvnLd6ojJuHKF+vugCktCFECLhrX6PsKPbeX2fJcvY5iCs4f4YeNdbPbHC244BTgBO7vfZjYSZ7S94q9+ocf3UyQZHfb5O2zwmMVVy7vSAJux4eGixsEW7kYQuhBAZkp3lKt1dboDRwNTA9f3u+aYy7gngsTquH1gr/kXC2vQ0FyVfE5Pz9vFWN2IGvWgB2W1NCCGE6AKS0IUQQoguIAldCCGE6AKS0IUQQoguIAldCCGE6AKS0IUQQoguIAldCCGE6AKS0IUQQoguIAldCCGE6AKS0IUQQoguIAldCCGE6AKS0IUQQogu8P8AAAD//+3VgQwAAADAIH/re3wlkdABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4ABoQPAgNABYEDoADAgdAAYEDoADAgdAAaEDgADQgeAAaEDwIDQAWBA6AAwIHQAGBA6AAwIHQAGhA4AA0IHgAGhA8CA0AFgQOgAMCB0ABgQOgAMCB0ABoQOAANCB4CBAAVGgR04+2KoAAAAAElFTkSuQmCC"} height={200} alt="Catalogo Web" />
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={3}>
                                Olá <b>{dadosUsuario.usu_nome}</b>
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row align="middle" justify="center">
                        <Col span={24}>
                            <Typography.Text>
                                Antes de ativar sua conta, precisamos definir sua senha de acesso. <br />
                                A senha deve atender os seguintes requisitos:<br /><br />
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            1. Mínimo de 6 caracteres;
                        </Col>
                        <Col span={24}>
                            2. Deve conter números e letras (maiúsculas e minúsculas);
                        </Col>
                    </Row>
                    <Row align="middle" className="m-t-16">
                        <Col span={24}>
                            <Form.Item label="Senha de Acesso" name="usu_senha" rules={[{ required: true, message: 'Informe a Senha de Acesso.' }]}>
                                <Input.Password placeholder="Informe Senha de Acesso" prefix={<UnlockFilled />} onChange={() => { validarSenha() }} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Confirmar Nova Senha" name="usu_confirmaSenha" rules={[{ required: true, message: 'Confirme a Senha de Acesso.' }]}>
                                <Input.Password placeholder="Confirme a Senha de Acesso" prefix={<UnlockFilled />} onChange={() => { validarSenha() }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button loading={carregando} disabled={!senhaValida} type="primary" htmlType="submit" className="login-form-button">
                            Ativar sua Conta <SendOutlined />
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
        </div>
    );
}
