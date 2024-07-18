document.addEventListener('DOMContentLoaded', function () {
    // Initialize Panolens viewer
    const panoramaElement = document.getElementById('panorama');
    const viewer = new PANOLENS.Viewer({
        container: panoramaElement,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        controlBar: false, // Disable control bar
        enableReticle: false, // Disable reticle
        horizontalView: true // Restrict to horizontal view
    });

    viewer.OrbitControls.noZoom = true;

    // Add your panoramic photo
    const panorama = new PANOLENS.ImagePanorama('./images/slider_360_with_lines12.jpg');
    viewer.add(panorama);

    // Set initial camera position to show the middle of the image
    panorama.addEventListener('enter', function () {
        viewer.OrbitControls.target.set(0, 0, 0); // Adjust target as needed
        viewer.OrbitControls.update();
    });

    // Add a clickable sphere at specific coordinates
    const sphereGeometry = new THREE.BoxGeometry(80, 150, 150);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xB7274B }); // #B7274B
    const clickableSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Specify the position in 3D space (adjust these values)
    clickableSphere.position.set(5000, 600, 0);
    panorama.add(clickableSphere);

    // Raycaster for detecting clicks on the sphere
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseDown(event) {
        const rect = panoramaElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, viewer.camera);
        const intersects = raycaster.intersectObject(clickableSphere);

        if (intersects.length > 0) {
            showSlide();
        }
    }

    function onMouseUp() {
        viewer.autoRotate = true;
    }

    function onMouseLeave() {
        viewer.autoRotate = true;
    }

    viewer.getContainer().addEventListener('mousedown', function (event) {
        viewer.autoRotate = false;
        onMouseDown(event);
    });

    viewer.getContainer().addEventListener('mouseup', onMouseUp);
    viewer.getContainer().addEventListener('mouseleave', onMouseLeave);

    // Show the slide
    function showSlide() {
        const slide = document.getElementById('slide');
        slide.classList.add('active');
    }

    // Hide the slide
    function hideSlide() {
        const slide = document.getElementById('slide');
        slide.classList.remove('active');
    }

    // Add click event listener to the close icon
    const closeIcon = document.getElementById('close-icon');
    closeIcon.addEventListener('click', hideSlide);

    // Smooth scroll to section 2
    const section2 = document.getElementById('section2');
    section2.addEventListener('click', function () {
        section2.scrollIntoView({ behavior: 'smooth' });
    });
});
