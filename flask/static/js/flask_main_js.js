$(document).ready(function () {
  // Init
  $(".image-section").hide();
  $(".loader").hide();
  $("#result").hide();

  // Upload Preview
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  $("#imageUpload").change(function () {
    $(".image-section").show();
    $("#btn-predict").show();
    $("#result").text("");
    $("#result").hide();
    readURL(this);
  });

  // Predict
  $("#btn-predict").click(function () {
    const disease = {
      "Left Bundle Branch Block": `Patient diagnosed with Left Bundle Branch Block (LBBB).
LBBB is an electrical conduction abnormality in the heart.
It causes a delay or blockage of electrical signals in the left bundle branch, affecting the heart's pumping function.
Symptoms may include fatigue, shortness of breath, and fainting.
Further diagnostic tests and evaluation by a cardiologist are recommended for proper management and treatment.`,
      "Ventricular Fibrillation": `Patient diagnosed with Ventricular Fibrillation (VF).
VF is a life-threatening cardiac arrhythmia characterized by rapid, chaotic, and ineffective contractions of the ventricles.
It leads to a loss of effective blood pumping and can result in cardiac arrest and death if not treated immediately.
Immediate defibrillation and advanced life support are essential for restoring normal heart rhythm and saving the patient's life.
Further investigation and treatment to address the underlying cause of VF may be necessary.`,
      "Right Bundle Branch Block": `Patient diagnosed with Right Bundle Branch Block (RBBB).
RBBB is an electrical conduction abnormality in the heart.
It causes a delay or blockage of electrical signals in the right bundle branch, affecting the heart's electrical coordination.
RBBB may be benign or indicative of underlying heart conditions.
Further evaluation by a cardiologist is advised to determine the cause and appropriate management.`,
      "Premature Ventricular Contractions": `Patient diagnosed with Premature Ventricular Contractions (PVCs).
PVCs are extra, abnormal heartbeats originating from the ventricles.
They may cause a sensation of skipped or irregular heartbeats.
Occasional PVCs are common and usually harmless, but frequent or sustained PVCs may require further evaluation.
Lifestyle modifications and treatment may be recommended based on the severity and underlying cause.`,
      "Premature Atrial Contraction": `Patient diagnosed with Premature Atrial Contraction (PAC).
PAC is an irregular heartbeat originating from the atria.
It is characterized by early, abnormal electrical impulses that cause an extra heartbeat.
PACs are generally harmless, but underlying heart conditions should be ruled out.
Monitoring and lifestyle modifications may be recommended for symptom management.`,
      $normal: `Don't worry your health is absolutely right!`,
    };

    var form_data = new FormData($("#upload-file")[0]);

    // Show loading animation
    $(this).hide();
    $(".loader").show();

    // Make prediction by calling api /predict
    $.ajax({
      type: "POST",
      url: "/predict",
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: function (data) {
        // Get and display the result
        var styleObject = $("body").prop("style");
        styleObject.removeProperty("background-image");
        $(".loader").hide();
        $("#result").fadeIn(600);
        $("#result").text(" Result:  " + data);
        $("#description").text(
          disease[`${data == "Normal" ? "$normal" : data}`]
        );
        $("body").css("background-color", "aliceblue");
      },
    });
  });
});
