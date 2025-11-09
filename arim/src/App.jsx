import { Map, Polygon, MapMarker, MapTypeId } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import '../src/App.css';

export default function APP() {
  const [mapCenter] = useState({ lat: 37.537566, lng: 126.742798 });
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [count, setCount] = useState(0);

  const handlePolygonClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log(`다각형이 ${count}번 클릭되었습니다.`);
  }, [count]);

  return (
    <div className="mapWrapper">
      <Map
        className="map"
        center={mapCenter}
        level={8}
        draggable
        onClick={(_, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          console.log(
            `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
          );
        }}
      >
        <MapTypeId type={'TERRAIN'} />
        <MapMarker
          position={{
            // 인포윈도우가 표시될 위치
            lat: 37.537566,
            lng: 126.742798,
          }}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onClick={() => setIsOpen(true)}
        >
          {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
          {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          {isOpen && (
            <div style={{ minWidth: '150px' }}>
              <img
                alt="close"
                width="14"
                height="13"
                src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsOpen(false)}
              />

              <div style={{ padding: '5px', color: '#000' }}>
                집 근처 어린이 교통공원
              </div>
            </div>
          )}
        </MapMarker>

        <Polygon
          path={[
            { lat: 37.53794790849756, lng: 126.74429406518135 },
            { lat: 37.538015593135356, lng: 126.7368004959506 },
            { lat: 37.53786724750667, lng: 126.73773579142568 },
            { lat: 37.53821350200734, lng: 126.73661434286373 },
            { lat: 37.5400462769347, lng: 126.73681178706653 },
            { lat: 37.55358055999832, lng: 126.73110029021547 },
            { lat: 37.55318483941828, lng: 126.71467955358821 },
            { lat: 37.54231900285312, lng: 126.70814913411982 },
            { lat: 37.53776925025096, lng: 126.71977341518402 },
            { lat: 37.53616391378155, lng: 126.73394514419527 },
            { lat: 37.53397857225488, lng: 126.73383266158737 },
            { lat: 37.53322028681801, lng: 126.74356285933186 },
            { lat: 37.53794790849756, lng: 126.74429406518135 },
          ]}
          strokeWeight={2}
          strokeColor={'#000000'}
          strokeOpacity={0.8}
          fillColor={isMouseOver ? '#ff4000' : '#ffac13'} // 채우기 색깔입니다
          fillOpacity={isMouseOver ? 0.8 : 0.5} // 채우기 불투명도 입니다
          onMouseover={() => setIsMouseOver(true)}
          onMouseout={() => setIsMouseOver(false)}
          onMousedown={() => {
            handlePolygonClick();
          }}
        ></Polygon>
      </Map>
    </div>
  );
}
