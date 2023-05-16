/* eslint-disable react/no-unescaped-entities */
import MainLayout from '../layouts/MainLayout';

export default function Cockies() {
  return (
    <MainLayout title={'storyarc | cookies'}>
      <div className="my-5 rounded-xl border  bg-white p-4">
        <h1 className=" text-2xl font-bold text-verde">Cookies</h1>
        <p className="text-sm">
          Os cookies são ficheiros com uma pequena quantidade de dados que são
          comumente usados como identificadores exclusivos anónimos. Estes são
          enviados para o seu navegador a partir dos websites que visita e são
          armazenados na memória interna do seu dispositivo. Este Serviço não
          utiliza explicitamente estes "cookies". No entanto, a aplicação pode
          usar códigos e bibliotecas de terceiros que usam "cookies" para
          recolher informações e melhorar os seus serviços. Tem a opção de
          aceitar ou recusar estes cookies e saber quando é enviado um cookie
          para o seu dispositivo. Se optar por recusar os nossos cookies, poderá
          não conseguir utilizar algumas partes deste Serviço.
        </p>
        <h1 className="py-2 font-medium">Prestadores de Serviços</h1>
        <p className="text-sm">
          Podemos empregar empresas e particulares de terceiros devido às
          seguintes razões: Para facilitar o nosso Serviço; Prestar o Serviço em
          nosso nome; Para a realização de serviços relacionados com o Serviço;
          ou Para nos ajudar a analisar como o nosso Serviço é utilizado.
          Queremos informar os utilizadores deste Serviço de que estes terceiros
          têm acesso às suas Informações Pessoais. A razão é executar as tarefas
          que lhes foram atribuídas em nosso nome. No entanto, são obrigados a
          não divulgar ou utilizar a informação para qualquer outro fim.
        </p>
        <h1 className="py-2 font-bold">Segurança</h1>
        <p className="text-sm">
          Valorizamos a sua confiança em fornecer-nos as suas Informações
          Pessoais, pelo que nos esforçamos por utilizar meios comercialmente
          aceitáveis para a proteger. Mas lembre-se que nenhum método de
          transmissão através da internet, ou método de armazenamento eletrónico
          é 100% seguro e fiável, e não podemos garantir a sua segurança
          absoluta.
        </p>
        <h1 className="py-2 font-bold">Links para outros sites</h1>
        <p className="text-sm">
          Este Serviço pode conter ligações a outros sites. Se clicar num link
          de terceiros, será direcionado para esse site. Note que estes sites
          externos não são operados por nós. Por isso, aconselhamos vivamente a
          rever a Política de Privacidade destes websites. Não temos qualquer
          controlo e não assumimos qualquer responsabilidade pelo conteúdo,
          políticas de privacidade ou práticas de quaisquer sites ou serviços de
          terceiros.
        </p>
        <h1 className="py-2 font-bold">Privacidade das Crianças</h1>
        <p className="text-sm">
          Estes Serviços não se dirigem a menores de 13 anos. Não recolhemos
          informação pessoalmente identificável de crianças menores de 13 anos.
          No caso de descobrirmos que uma criança com menos de 13 anos nos
          forneceu informações pessoais, eliminamos imediatamente isso dos
          nossos servidores. Se é pai ou tutor e está ciente de que o seu filho
          nos forneceu informações pessoais, contacte-nos para que possamos
          fazer as ações necessárias.
        </p>
        <h1 className="py-2 font-bold">
          Alterações a Esta Política de Privacidade
        </h1>
        <p className="text-sm">
          Podemos atualizar a nossa Política de Privacidade de vez em quando.
          Assim, é aconselhável rever esta página periodicamente para quaisquer
          alterações. Iremos notificá-lo de quaisquer alterações publicando a
          nova Política de Privacidade nesta página. Esta política é eficaz a
          partir de 2022-01-18
        </p>
        <h1 className="py-2 font-bold">Contacto</h1>
        <p className="text-sm">
          Se tiver alguma dúvida ou sugestão sobre a nossa Política de
          Privacidade, não hesite em contactar-nos support@storyarc.pt.
        </p>
      </div>
    </MainLayout>
  );
}
