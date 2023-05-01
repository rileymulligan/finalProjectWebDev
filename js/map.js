let index = 0;
      const maps = [];

      function updateMapData() {
        document.getElementById('displayName').textContent = maps[index].displayName;
        document.getElementById('displayIcon').src = maps[index].displayIcon;
        document.getElementById('listviewicon').src = maps[index].listViewIcon;
        document.getElementById('splash').src = maps[index].splash;
        document.getElementById('coordinates').textContent = maps[index].coordinates;
      }

      function updateIndex(offset) {
        index += offset;
        if (index < 0) {
          index = maps.length - 1;
        } else if (index >= maps.length) {
          index = 0;
        }
        updateMapData();
      }

      function fetchMaps() {
        fetch('https://valorant-api.com/v1/maps')
          .then(response => response.json())
          .then(data => {
            maps.push(...data.data);
            updateMapData();
          })
          .catch(error => console.error(error));
      }

      document.getElementById('previousBtn').addEventListener('click', () => {
        updateIndex(-1);
      });

      document.getElementById('nextBtn').addEventListener('click', () => {
        updateIndex(1);
      });

      fetchMaps();