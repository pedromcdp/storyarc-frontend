/* eslint-disable react/no-unescaped-entities */
import MainLayout from '../layouts/MainLayout';

export default function privpolicy() {
  return (
    <MainLayout>
      <h1 className="py-5 text-2xl font-bold text-verde">
        Política de Privacidade
      </h1>

      <p>
        Storyarc construiu a aplicação storyarc como uma aplicação gratuita.
        Este SERVIÇO é fornecido pelo storyarc sem custos e destina-se a ser
        utilizado como está. Esta página é utilizada para informar os visitantes
        sobre as nossas políticas com a recolha, utilização e divulgação de
        Informações Pessoais se alguém decidir utilizar o nosso Serviço. Se
        optar por utilizar o nosso Serviço, então concorda com a recolha e
        utilização de informações em relação a esta política. As Informações
        Pessoais que recolhemos são utilizadas para fornecer e melhorar o
        Serviço. Não usaremos nem partilharemos as suas informações com ninguém,
        exceto como descrito nesta Política de Privacidade. Os termos utilizados
        nesta Política de Privacidade têm os mesmos significados que nos nossos
        Termos e Condições, que são acessíveis no storyarc, salvo definição em
        contrário nesta Política de Privacidade.
      </p>
      <h1 className="py-2 font-bold">Recolha e Utilização de Informação</h1>
      <p>
        Para uma melhor experiência, ao utilizar o nosso Serviço, podemos exigir
        que nos forneça determinadas informações pessoalmente identificáveis. As
        informações que solicitamos serão retidas por nós e utilizadas como
        descrito nesta política de privacidade. A aplicação utiliza serviços de
        terceiros que podem recolher informações usadas para o identificar.
      </p>
      <h1 className="py-2 font-bold">Dados de Registo</h1>
      <p className="pb-10">
        Queremos informá-lo que sempre que utiliza o nosso Serviço, em caso de
        erro na app recolhemos dados e informações (através de produtos de
        terceiros) no seu telefone chamado Registo de Dados. Estes Dados de
        Registo podem incluir informações como o endereço do Protocolo de
        Internet do seu dispositivo ("IP"), nome do dispositivo, versão do
        sistema operativo, a configuração da aplicação ao utilizar o nosso
        Serviço, a hora e a data da sua utilização do Serviço, e outras
        estatísticas.
      </p>
    </MainLayout>
  );
}
