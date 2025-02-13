import React, { useContext, useEffect } from "react";
const About = () => {
  return (
    <div>
      <h3>About iNoteBook</h3>
      iNoteBook is a perfect site that welcomes the user with grace and gives
      funny, much functional capacity as well. Its purpose is to make
      'note-taking' simple and effective. As seamless as the signup and login
      will be, it is centralized in one location for storing and organizing
      words, thoughts, ideas, and possible important information. iNoteBook will
      work for you if you are a student, a professional, or just someone who
      loves to keep notes.
      <h3 className="my-2">Why iNoteBook?</h3>
      In this fast-paced world, it is much important to have proper management
      of information because it seems to be on too deep levels of importance
      today. iNoteBook is really shining in such advantages because it has that
      complete combination of simplicity and powerful features that make the act
      of note-taking easier. You can create, edit, and view your notes at any
      time and from any place. An effective and secure logging-in mechanism
      means that data will be secure and you will be able to do your note
      management activities with full concentration. Even if someone has no tech
      background, one can use the site easily as it is designed very
      intuitively.
      <h3 className="my-2">Advantages Over Other Platforms</h3>
      <div className="my-2">
        <b>
          <i className="fa-solid fa-shield"></i> Safety
        </b>{" "}
        : A strong authentication and encryption system ensures that your notes
        are stored safely.
      </div>
      <div className="my-2">
        <i class="fa-solid fa-check"></i> <b>Simplicity:</b> A clean,
        user-friendly interface allows for quick navigation and efficient
        note-organizing.
      </div>
      <div className="my-2">
        <i className="fa-brands fa-windows"></i> <b> Access:</b> Access your
        notes from any device, so you can be organized when you are on the go.
      </div>
      <div className="my-2">
        <i className="fa-solid fa-database"></i> <b> Offline Access:</b>{" "}
        iNoteBook allows the creation and access to notes without any internet
        connection—truly world-friendly for the kind of work done in any
        environment.
      </div>
      <div className="my-2">
        <i className="fa-solid fa-arrow-up"></i> <b> Enhanced Performance:</b>{" "}
        Built with the MERN stack, it delivers a responsive and high-performance
        experience to users. This is not just any note-taking application; it
        will keep you productive and focused on keeping you organized anywhere
        you go.
      </div>
      <h5 className="icons">
        <i className="fa-brands fa-whatsapp"></i>
      </h5>
      <h5 className="icons">
        <i className="fa-brands fa-instagram"></i>
      </h5>
      <h5 className="icons">
        <i className="fa-brands fa-linkedin"></i>
      </h5>
    </div>
  );
};

export default About;
