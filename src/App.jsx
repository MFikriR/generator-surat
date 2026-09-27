import React, { useState } from 'react';
import { FileText, Printer, Upload, Check, Stamp, Heart, Calendar, MapPin } from 'lucide-react';

// 4 Template Utama dengan Layout Berbeda
const TEMPLATES = {
  resmi: {
    id: 'resmi',
    nama: 'Surat Resmi / Formal',
    jenis: 'resmi',
    nomorSurat: '001/PCI-HRD/IX/2026',
    perihal: 'Permohonan / Keterangan Resmi',
    salamPembuka: 'Dengan hormat,',
    isiSurat: 'Dengan ini kami memberitahukan/menerangkan bahwa nama yang bersangkutan adalah benar staf/karyawan aktif di instansi kami dan diberikan wewenang untuk keperluan administrasi resmi.',
    salamPenutup: 'Demikian surat ini kami sampaikan untuk dapat dipergunakan sebagaimana mestinya. Atas perhatiannya, kami ucapkan terima kasih.',
  },
  pernyataan: {
    id: 'pernyataan',
    nama: 'Surat Pernyataan / Perjanjian',
    jenis: 'pernyataan',
    nomorSurat: '102/SP/IX/2026',
    perihal: 'SURAT PERNYATAAN KESANGGUPAN',
    salamPembuka: 'Yang bertanda tangan di bawah ini:',
    isiSurat: 'Dengan ini menyatakan dengan sejujurnya bahwa saya bersedia mematuhi seluruh peraturan yang berlaku dan bertanggung jawab penuh atas segala ketentuan yang telah disepakati bersama.',
    salamPenutup: 'Demikian surat pernyataan ini saya buat dalam keadaan sadar tanpa ada paksaan dari pihak manapun.',
  },
  undangan: {
    id: 'undangan',
    nama: 'Undangan Acara / Non-Formal',
    jenis: 'undangan',
    nomorSurat: '-',
    perihal: 'YOU ARE INVITED!',
    salamPembuka: 'Halo Teman & Kerabat!',
    isiSurat: 'Dalam rangka merayakan Momen Spesial / Syukuran, kami mengundang Bapak/Ibu/Saudara/i untuk dapat berhadir dan bersenang-senang bersama pada acara kami.',
    salamPenutup: 'Kehadiran dan doa restu Anda adalah kebahagiaan terbesar bagi kami. Sampai jumpa di lokasi acara!',
  },
  pernikahan: {
    id: 'pernikahan',
    nama: 'Undangan Pernikahan (Wedding)',
    jenis: 'pernikahan',
    nomorSurat: '-',
    perihal: "WALIMATUL 'URSYSY",
    salamPembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    isiSurat: 'Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan syukuran pernikahan putra-putri kami:',
    salamPenutup: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.',
  }
};

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('resmi');
  const [logo, setLogo] = useState(null);
  const [useMaterai, setUseMaterai] = useState(false);
  
  // Form State Utama
  const [formData, setFormData] = useState({
    kota: 'Jakarta',
    tanggal: new Date().toISOString().split('T')[0],
    instansi: 'PT PERUSAHAAN CONTOH INDONESIA',
    alamatInstansi: 'Jl. Jendral Sudirman No. 123, Jakarta Selatan',
    nomorSurat: TEMPLATES.resmi.nomorSurat,
    perihal: TEMPLATES.resmi.perihal,
    penerimaNama: 'Bapak/Ibu Pimpinan',
    penerimaAlamat: 'Di Tempat',
    salamPembuka: TEMPLATES.resmi.salamPembuka,
    
    // Label & Nilai Kustomisasi Identitas
    labelIdentitas: 'NIM / NIK / ID',
    pengirimIdentitas: '1234567890',
    labelJabatan: 'Jabatan / Status',
    pengirimJabatan: 'Staf / Karyawan',
    
    pengirimNama: 'Budi Santoso',
    pihakKeduaNama: 'Ahmad Ananda',
    pihakKeduaJabatan: 'Pihak II / Saksi',
    isiSurat: TEMPLATES.resmi.isiSurat,
    salamPenutup: TEMPLATES.resmi.salamPenutup,
    penandatangan: 'Budi Santoso',
    
    // Khusus Undangan Umum
    waktuAcara: '19.00 WIB - Selesai',
    lokasiAcara: 'Grand Ballroom Hotel, Jakarta',

    // Khusus Undangan Pernikahan
    priaNama: 'Budi Santoso, S.Kom',
    priaOrangTua: 'Putra dari Bpk. M. Ali & Ibu Siti',
    wanitaNama: 'Siti Rahma, S.Pd',
    wanitaOrangTua: 'Putri dari Bpk. H. Hasan & Ibu Aminah',
    waktuAkad: 'Sabtu, 10 Oktober 2026 | 08.00 WIB',
    waktuResepsi: 'Sabtu, 10 Oktober 2026 | 11.00 - 14.00 WIB',
    lokasiPernikahan: 'Gedung Serbaguna Utama, Jakarta'
  });

  const handleTemplateChange = (templateKey) => {
    setSelectedTemplate(templateKey);
    const tpl = TEMPLATES[templateKey];
    setFormData((prev) => ({
      ...prev,
      nomorSurat: tpl.nomorSurat,
      perihal: tpl.perihal,
      salamPembuka: tpl.salamPembuka,
      isiSurat: tpl.isiSurat,
      salamPenutup: tpl.salamPenutup
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentJenis = TEMPLATES[selectedTemplate].jenis;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-12 print:bg-white print:p-0 print:pb-0 overflow-x-hidden">
      
      {/* CSS Pengunci Halaman Tunggal & Presisi Print Mobile */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm !important;
          }
          html, body {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
          .a4-document {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            padding: 12mm 15mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            box-sizing: border-box !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Navbar Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex flex-wrap justify-between items-center px-4 sm:px-6 gap-4 sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-lg font-bold leading-none">SuratCraft Pro</h1>
            <span className="text-[10px] text-slate-400">Multi-Layout Document Generator</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak / Save PDF
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row p-3 sm:p-6 gap-6 max-w-[1600px] mx-auto w-full print:p-0 print:m-0 print:max-w-none">
        
        {/* PANEL KIRI: FORM CONFIGURATION */}
        <div className="w-full lg:w-5/12 bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col gap-5 h-fit print:hidden">
          
          {/* Template Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pilih Layout / Jenis Dokumen</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(TEMPLATES).map((key) => (
                <button
                  key={key}
                  onClick={() => handleTemplateChange(key)}
                  className={`text-xs p-2.5 sm:p-3 rounded-lg text-left border transition flex justify-between items-center ${
                    selectedTemplate === key
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{TEMPLATES[key].nama}</span>
                  {selectedTemplate === key && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Kop Surat (Resmi Only) */}
          {currentJenis === 'resmi' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Kop Surat & Logo</label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-slate-600 mb-1">Upload Logo</label>
                  <label className="flex items-center justify-center gap-2 border border-dashed border-slate-300 rounded-lg p-2 cursor-pointer hover:bg-slate-50 transition text-xs text-slate-600">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span>{logo ? 'Ganti Logo' : 'Pilih File'}</span>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
                {logo && (
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo Prev" className="h-10 w-10 object-contain border rounded p-1" />
                    <button onClick={() => setLogo(null)} className="text-[11px] text-red-500 hover:underline">Hapus Logo</button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="instansi"
                  placeholder="Nama Instansi / Perusahaan"
                  value={formData.instansi}
                  onChange={handleChange}
                  className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
                />
                <input
                  type="text"
                  name="alamatInstansi"
                  placeholder="Alamat Lengkap / Kontak Instansi"
                  value={formData.alamatInstansi}
                  onChange={handleChange}
                  className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
                />
              </div>
              <hr className="border-slate-100 mt-5" />
            </div>
          )}

          {/* Form Khusus Pernikahan */}
          {currentJenis === 'pernikahan' ? (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detail Mempelai & Acara</label>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="priaNama" placeholder="Nama Mempelai Pria" value={formData.priaNama} onChange={handleChange} className="p-2 border rounded-md outline-none" />
                  <input type="text" name="priaOrangTua" placeholder="Orang Tua Pria" value={formData.priaOrangTua} onChange={handleChange} className="p-2 border rounded-md outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" name="wanitaNama" placeholder="Nama Mempelai Wanita" value={formData.wanitaNama} onChange={handleChange} className="p-2 border rounded-md outline-none" />
                  <input type="text" name="wanitaOrangTua" placeholder="Orang Tua Wanita" value={formData.wanitaOrangTua} onChange={handleChange} className="p-2 border rounded-md outline-none" />
                </div>
                <input type="text" name="waktuAkad" placeholder="Waktu Akad Nikah" value={formData.waktuAkad} onChange={handleChange} className="w-full p-2 border rounded-md outline-none" />
                <input type="text" name="waktuResepsi" placeholder="Waktu Resepsi" value={formData.waktuResepsi} onChange={handleChange} className="w-full p-2 border rounded-md outline-none" />
                <input type="text" name="lokasiPernikahan" placeholder="Lokasi Gedung / Alamat" value={formData.lokasiPernikahan} onChange={handleChange} className="w-full p-2 border rounded-md outline-none" />
              </div>
            </div>
          ) : (
            /* Form Lokasi, Tanggal & Identitas */
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Lokasi, Tanggal & Penerima</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-[11px] text-slate-500">Kota</label>
                  <input type="text" name="kota" value={formData.kota} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500">Tanggal</label>
                  <input type="date" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                </div>
              </div>

              {currentJenis === 'resmi' && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-[11px] text-slate-500">Nomor Surat</label>
                    <input type="text" name="nomorSurat" value={formData.nomorSurat} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500">Perihal</label>
                    <input type="text" name="perihal" value={formData.perihal} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                  </div>
                </div>
              )}

              {currentJenis === 'pernyataan' && (
                <div className="mb-2">
                  <label className="block text-[11px] text-slate-500">Judul Pernyataan</label>
                  <input type="text" name="perihal" value={formData.perihal} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none font-bold uppercase" />
                </div>
              )}

              {currentJenis !== 'undangan' && (
                <div className="space-y-2 mt-3">
                  <label className="block text-[11px] text-slate-500 font-semibold">Tujuan / Kepada Yth:</label>
                  <input type="text" name="penerimaNama" placeholder="Nama Tujuan" value={formData.penerimaNama} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                  <input type="text" name="penerimaAlamat" placeholder="Alamat / Tempat" value={formData.penerimaAlamat} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                </div>
              )}
            </div>
          )}

          <hr className="border-slate-100" />

          {/* Form Khusus Undangan Acara */}
          {currentJenis === 'undangan' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Detail Acara Undangan</label>
              <div className="space-y-2">
                <input type="text" name="waktuAcara" placeholder="Jam / Waktu Acara" value={formData.waktuAcara} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                <input type="text" name="lokasiAcara" placeholder="Lokasi Tempat Acara" value={formData.lokasiAcara} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
              </div>
              <hr className="border-slate-100 mt-5" />
            </div>
          )}

          {/* Pengirim & Identitas Fleksibel */}
          {currentJenis !== 'pernikahan' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pengirim & Kustomisasi Jabatan</label>
              <div className="space-y-2 mb-2">
                <input type="text" name="pengirimNama" placeholder="Nama Utama / Pihak I" value={formData.pengirimNama} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                
                {/* Kustom Label & Nilai Identitas */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">Judul Label 1</label>
                    <input type="text" name="labelIdentitas" value={formData.labelIdentitas} onChange={handleChange} className="w-full text-xs p-1.5 border border-slate-200 rounded outline-none bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Isi Nilai 1</label>
                    <input type="text" name="pengirimIdentitas" value={formData.pengirimIdentitas} onChange={handleChange} className="w-full text-xs p-1.5 border border-slate-300 rounded outline-none" />
                  </div>
                </div>

                {/* Kustom Label & Nilai Jabatan */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400">Judul Label 2 (Jabatan)</label>
                    <input type="text" name="labelJabatan" value={formData.labelJabatan} onChange={handleChange} className="w-full text-xs p-1.5 border border-slate-200 rounded outline-none bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400">Isi Nilai 2</label>
                    <input type="text" name="pengirimJabatan" value={formData.pengirimJabatan} onChange={handleChange} className="w-full text-xs p-1.5 border border-slate-300 rounded outline-none" />
                  </div>
                </div>
              </div>

              {currentJenis === 'pernyataan' && (
                <div className="grid grid-cols-2 gap-2 mb-2 bg-blue-50/50 p-2 rounded border border-blue-100">
                  <input type="text" name="pihakKeduaNama" placeholder="Nama Pihak II / Saksi" value={formData.pihakKeduaNama} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                  <input type="text" name="pihakKeduaJabatan" placeholder="Jabatan Pihak II" value={formData.pihakKeduaJabatan} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
                </div>
              )}
            </div>
          )}

          {/* Isi Teks */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Isi Paragraf Surat</label>
            <div className="space-y-2">
              <textarea name="isiSurat" rows={3} placeholder="Isi Teks Utama" value={formData.isiSurat} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none resize-none" />
              <textarea name="salamPenutup" rows={2} placeholder="Salam Penutup" value={formData.salamPenutup} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none resize-none" />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Opsi Materai & Penandatangan */}
          <div>
            {currentJenis !== 'pernikahan' && (
              <div className="mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Nama Penandatangan</label>
                <input type="text" name="penandatangan" value={formData.penandatangan} onChange={handleChange} className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none" />
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer select-none bg-slate-50 p-2.5 rounded border border-slate-200 hover:bg-slate-100 transition">
              <input type="checkbox" checked={useMaterai} onChange={(e) => setUseMaterai(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" />
              <Stamp className="w-4 h-4 text-slate-500" />
              <span className="text-xs text-slate-700 font-medium">Tambahkan Area Materai (Rp 10.000)</span>
            </label>
          </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN A4 */}
        <div className="w-full lg:w-7/12 flex flex-col items-center justify-start overflow-x-auto pb-4 print:w-full print:block print:p-0 print:m-0">
          <div className="mb-3 text-xs text-slate-500 font-medium flex items-center gap-1.5 print:hidden">
            <Printer className="w-4 h-4 text-blue-600" /> Live Preview Tampilan Dokumen A4
          </div>
          
          {/* ========================================================
              LAYOUT 1: SURAT RESMI / FORMAL
             ======================================================== */}
          {currentJenis === 'resmi' && (
            <div className="a4-document bg-white shadow-xl p-8 sm:p-10 w-[210mm] min-w-[210mm] text-slate-900 border border-slate-200 flex flex-col justify-between text-sm leading-relaxed font-serif break-words box-border">
              <div>
                {/* Kop Surat */}
                <div className="flex items-center gap-4 pb-3 mb-5 border-b-4 border-double border-black text-center">
                  {logo && <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />}
                  <div className={logo ? 'text-left flex-1' : 'w-full text-center'}>
                    <h2 className="font-bold uppercase tracking-wider text-lg break-words">{formData.instansi || 'NAMA INSTANSI / PERUSAHAAN'}</h2>
                    <p className="text-xs text-slate-600 mt-0.5 break-words">{formData.alamatInstansi}</p>
                  </div>
                </div>

                {/* Tanggal & Nomor */}
                <div className="flex justify-between items-start mb-5 text-sm gap-4">
                  <div>
                    <p><span className="font-semibold">Nomor:</span> {formData.nomorSurat}</p>
                    <p><span className="font-semibold">Hal:</span> {formData.perihal}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p>{formData.kota}, {formData.tanggal}</p>
                  </div>
                </div>

                {/* Penerima */}
                <div className="mb-5 break-words">
                  <p>Kepada Yth,</p>
                  <p className="font-semibold">{formData.penerimaNama}</p>
                  <p>{formData.penerimaAlamat}</p>
                </div>

                {/* Isi */}
                <div className="space-y-3">
                  <p>{formData.salamPembuka}</p>
                  <p className="text-justify leading-relaxed indent-8 break-words">{formData.isiSurat}</p>

                  <div className="ml-4 sm:ml-6 my-3 space-y-1 text-sm bg-slate-50/50 p-2.5 rounded border border-slate-100">
                    <p className="break-words"><span className="w-32 sm:w-36 inline-block font-medium">{formData.labelIdentitas}</span>: {formData.pengirimNama}</p>
                    <p className="break-words"><span className="w-32 sm:w-36 inline-block font-medium">ID / Nomor</span>: {formData.pengirimIdentitas}</p>
                    <p className="break-words"><span className="w-32 sm:w-36 inline-block font-medium">{formData.labelJabatan}</span>: {formData.pengirimJabatan}</p>
                  </div>

                  <p className="text-justify leading-relaxed break-words">{formData.salamPenutup}</p>
                </div>
              </div>

              {/* Ttd Kanan Bawah */}
              <div className="flex justify-end mt-auto pt-6">
                <div className="text-center w-60">
                  <p>{formData.kota}, {formData.tanggal}</p>
                  <p className="mt-0.5 font-medium">Hormat Saya,</p>
                  <div className="h-20 flex items-center justify-center gap-2 my-1 relative">
                    {useMaterai && (
                      <div className="w-20 h-14 border border-dashed border-slate-300 rounded text-[9px] text-slate-400 flex items-center justify-center text-center p-1 uppercase tracking-wider leading-tight select-none">
                        Materai<br />Rp 10.000
                      </div>
                    )}
                    <div className="flex-1 italic text-xs text-slate-300">( Tanda Tangan )</div>
                  </div>
                  <p className="font-bold underline break-words">{formData.penandatangan}</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 2: SURAT PERNYATAAN / PERJANJIAN
             ======================================================== */}
          {currentJenis === 'pernyataan' && (
            <div className="a4-document bg-white shadow-xl p-8 sm:p-10 w-[210mm] min-w-[210mm] text-slate-900 border border-slate-200 flex flex-col justify-between text-sm leading-relaxed font-serif break-words box-border">
              <div>
                <div className="text-center mb-8 mt-2">
                  <h2 className="font-bold text-xl uppercase underline tracking-wider break-words">{formData.perihal}</h2>
                  <p className="text-xs text-slate-500 mt-1">Nomor: {formData.nomorSurat}</p>
                </div>

                <div className="space-y-4">
                  <p>{formData.salamPembuka}</p>

                  <div className="ml-4 sm:ml-6 my-3 space-y-1 text-sm bg-slate-50 p-3 rounded border border-slate-200">
                    <p className="break-words"><span className="w-32 sm:w-36 inline-block font-medium">Nama</span>: {formData.pengirimNama}</p>
                    <p className="break-words"><span className="w-32 sm:w-36 inline-block font-medium">{formData.labelIdentitas}</span>: {formData.pengirimIdentitas}</p>
                    <p className="break-words"><span className="w-32 sm:w-36 inline-block font-medium">{formData.labelJabatan}</span>: {formData.pengirimJabatan}</p>
                  </div>

                  <p className="text-justify leading-relaxed indent-8 break-words">{formData.isiSurat}</p>
                  <p className="text-justify leading-relaxed break-words">{formData.salamPenutup}</p>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <p className="text-right text-sm mb-4">{formData.kota}, {formData.tanggal}</p>
                <div className="flex justify-between items-end">
                  <div className="text-center w-48 sm:w-52">
                    <p className="font-medium break-words">{formData.pihakKeduaJabatan}</p>
                    <div className="h-20 flex items-center justify-center italic text-xs text-slate-300">( Tanda Tangan )</div>
                    <p className="font-bold underline break-words">{formData.pihakKeduaNama}</p>
                  </div>

                  <div className="text-center w-48 sm:w-52">
                    <p className="font-medium">Pihak I / Pembuat</p>
                    <div className="h-20 flex items-center justify-center gap-2 my-1 relative">
                      {useMaterai && (
                        <div className="w-20 h-14 border border-dashed border-slate-300 rounded text-[9px] text-slate-400 flex items-center justify-center text-center p-1 uppercase tracking-wider leading-tight select-none">
                          Materai<br />Rp 10.000
                        </div>
                      )}
                      <div className="flex-1 italic text-xs text-slate-300">( Tanda Tangan )</div>
                    </div>
                    <p className="font-bold underline break-words">{formData.penandatangan}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 3: UNDANGAN ACARA UMUM
             ======================================================== */}
          {currentJenis === 'undangan' && (
            <div className="a4-document bg-white shadow-xl p-6 sm:p-8 w-[210mm] min-w-[210mm] text-slate-900 border-8 border-double border-slate-800 flex flex-col justify-between text-sm leading-relaxed font-sans text-center break-words box-border">
              <div className="flex flex-col items-center justify-center my-auto space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Official Invitation</span>
                  <h1 className="text-3xl font-extrabold text-slate-800 tracking-wider uppercase mt-1 break-words">{formData.perihal}</h1>
                  <div className="w-16 h-1 bg-slate-800 mx-auto mt-2 rounded"></div>
                </div>

                <p className="text-base font-semibold text-slate-700">{formData.salamPembuka}</p>
                <p className="max-w-lg text-slate-600 leading-relaxed mx-auto break-words">{formData.isiSurat}</p>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl w-full max-w-md space-y-2.5 shadow-sm my-2">
                  <div className="flex items-center justify-center gap-2 text-slate-800 font-medium">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>{formData.kota}, {formData.tanggal} ({formData.waktuAcara})</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-600 text-xs">
                    <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span className="break-words">{formData.lokasiAcara}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic max-w-md break-words">{formData.salamPenutup}</p>

                <div className="pt-2">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Hormat Kami,</p>
                  <p className="text-lg font-bold text-slate-800 mt-1 break-words">{formData.penandatangan}</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              LAYOUT 4: UNDANGAN PERNIKAHAN (WEDDING INVITATION)
             ======================================================== */}
          {currentJenis === 'pernikahan' && (
            <div className="a4-document bg-amber-50/30 shadow-xl p-8 sm:p-10 w-[210mm] min-w-[210mm] text-slate-800 border-4 border-amber-200/80 rounded-sm flex flex-col justify-between text-sm leading-relaxed font-serif text-center break-words box-border">
              <div className="flex flex-col items-center justify-between my-auto space-y-4">
                
                {/* Header Ornamen */}
                <div>
                  <Heart className="w-8 h-8 text-rose-500 mx-auto mb-1 animate-pulse" />
                  <span className="text-xs tracking-[0.2em] font-semibold text-amber-800 uppercase">{formData.perihal}</span>
                  <p className="text-xs text-slate-500 italic mt-2">{formData.salamPembuka}</p>
                </div>

                <p className="text-xs text-slate-600 max-w-md italic leading-relaxed mx-auto">{formData.isiSurat}</p>

                {/* Pasangan Mempelai */}
                <div className="my-2 space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-rose-700 font-serif italic">{formData.priaNama}</h2>
                    <p className="text-[11px] text-slate-500">{formData.priaOrangTua}</p>
                  </div>
                  <span className="text-lg font-bold text-amber-600 italic">&</span>
                  <div>
                    <h2 className="text-2xl font-bold text-rose-700 font-serif italic">{formData.wanitaNama}</h2>
                    <p className="text-[11px] text-slate-500">{formData.wanitaOrangTua}</p>
                  </div>
                </div>

                {/* Event Cards (Akad & Resepsi) */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-md my-2 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-sm">
                    <p className="font-bold text-amber-900 border-b border-amber-100 pb-1 mb-1">AKAD NIKAH</p>
                    <p className="text-slate-600">{formData.waktuAkad}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-sm">
                    <p className="font-bold text-amber-900 border-b border-amber-100 pb-1 mb-1">RESEPSI</p>
                    <p className="text-slate-600">{formData.waktuResepsi}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700 font-medium">
                  <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{formData.lokasiPernikahan}</span>
                </div>

                <p className="text-[11px] text-slate-500 italic max-w-md leading-relaxed">{formData.salamPenutup}</p>

                <div className="pt-2">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">Kami Yang Berbahagia,</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">Keluarga Besar Kedua Mempelai</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}