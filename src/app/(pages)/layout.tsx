import Container from "@/components/Container";
import Image from "next/image";
import quisSommesNous from "@/public/assets/images/qui-sommes-nous.png";

const About = ({}) => {
  return (
    <Container>
      <h1 className="mt-12 text-3xl font-bold font-title text-primary-title mb-4">
        Lorem ipsum dolor sit amet,
      </h1>

      <p className="mb-4 text-lg lg:text-xl">
        Sed at mauris tempus, ornare nulla eu, finibus nisi. Nunc vitae
        dignissim urna. Cras fringilla tincidunt lacus sed finibus. Sed ut
        volutpat eros. Ut id eleifend turpis. Sed felis magna, blandit nec
        faucibus sed, facilisis ut diam. Aliquam porta massa accumsan tortor
        semper scelerisque. Proin id blandit ipsum, vitae cursus lacus. Mauris
        ac mauris facilisis, pellentesque turpis eget, tempor nisl. Fusce ut
        enim auctor, vehicula lectus sed, faucibus magna. Etiam fermentum elit
        et leo faucibus aliquet. Morbi eu ligula libero.
      </p>

      <h2 className="text-3xl font-bold font-title text-primary-title mb-4">
        Notre objectif :
      </h2>

      <p className="text-lg mb-6 lg:text-xl">
        Etiam in tortor nec nulla dignissim iaculis. Integer efficitur tincidunt
        semper. Integer efficitur molestie lorem, eu egestas nisl porttitor sed.
        Sed dolor magna, finibus sit amet sodales in, mollis et eros. Maecenas
        eu ultrices libero, eu posuere nisi. Aenean justo sem, imperdiet ut
        purus eget, pretium semper leo. Quisque eget ultrices dolor. Curabitur
        risus lorem, sodales id felis sed, euismod ullamcorper orci. Vivamus
        pharetra vestibulum ligula sed tristique. In hac habitasse platea
        dictumst. Etiam eget rutrum elit.
      </p>

      <Image
        className=" rounded-sm"
        src={quisSommesNous}
        alt="qui-sommes-nous-1"
      />
    </Container>
  );
};

export default About;
