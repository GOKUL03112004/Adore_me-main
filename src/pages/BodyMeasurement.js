import React, { useState } from 'react';
import './BodyMeasurement.css';

const BodyMeasurement = () => {
  const [measurements, setMeasurements] = useState({
    height: '',
    chest: '',
    waist: '',
    hips: '',
    inseam: '',
  });
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (content, videoUrl) => {
    setModalContent({ content, videoUrl });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log('Form Submitted:', measurements);
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <h2>Enter Your Body Measurements</h2>

        {/* Height input */}
        <div className="input-group">
          <input
            type="number"
            placeholder="Height (cm)"
            value={measurements.height}
            onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
          />
          <button type="button" className="help-btn" onClick={() => openModal('Height: Measure your height without shoes, standing straight against a wall.', 'https://www.youtube.com/embed/VONs9Lpjq_E')}>?</button>
        </div>

        {/* Chest input */}
        <div className="input-group">
          <input
            type="number"
            placeholder="Chest (cm)"
            value={measurements.chest}
            onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
          />
          <button type="button" className="help-btn" onClick={() => openModal('Chest: Measure the circumference of your chest at the fullest part.', 'https://youtube.com/embed/Jk9r3eDSlYw')}>?</button>
        </div>

        {/* Waist input */}
        <div className="input-group">
          <input
            type="number"
            placeholder="Waist (cm)"
            value={measurements.waist}
            onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
          />
          <button type="button" className="help-btn" onClick={() => openModal('Waist: Measure the narrowest part of your waist, typically just above the belly button.', 'https://www.youtube.com/embed/video-id')}>?</button>
        </div>

        {/* Hips input */}
        <div className="input-group">
          <input
            type="number"
            placeholder="Hips (cm)"
            value={measurements.hips}
            onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
          />
          <button type="button" className="help-btn" onClick={() => openModal('Hips: Measure around the fullest part of your hips, across your buttocks.', 'https://youtube.com/embed/GoFxXdrDRfc')}>?</button>
        </div>

        {/* Inseam input */}
        <div className="input-group">
          <input
            type="number"
            placeholder="Inseam (cm)"
            value={measurements.inseam}
            onChange={(e) => setMeasurements({ ...measurements, inseam: e.target.value })}
          />
          <button type="button" className="help-btn" onClick={() => openModal('Inseam: Measure from your crotch to the bottom of your ankle.', 'https://youtube.com/embed/y1UVyknw0Uk')}>?</button>
        </div>

        <button type="submit">Submit Measurements</button>
      </form>

      {/* Modal for YouTube Video and Description */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>
            <h3>{modalContent.content}</h3>
            <iframe
              width="560"
              height="315"
              src={modalContent.videoUrl}
              title="Measurement Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyMeasurement;
