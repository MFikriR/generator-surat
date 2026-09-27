import React, { useState } from 'react';
import { FileText, Printer, Upload, Check } from 'lucide-react';

// Template bawaan
const TEMPLATES = {
  izin: {
    nama: 'Surat Izin Formal',
    jenis: 'formal',
    nomorSurat: '001/SRT-IZIN/IX/2026',
    perihal: 'Permohonan Izin Tidak Hadir',
    salamPembuka: 'Dengan hormat,',
    isiSurat: 'Dengan ini saya memberitahukan bahwa saya tidak dapat berhadir pada kegiatan perkuliahan/pekerjaan yang dijadwalkan dikarenakan ada keperluan mendesak yang tidak dapat ditinggalkan.',
    salamPenutup: 'Demikian surat permohonan ini saya sampaikan. Atas perhatian dan kebijaksanaannya, saya ucapkan terima kasih.',
  },
  undangan: {
    nama: 'Undangan Acara Resmi',
    jenis: 'formal',
    nomorSurat: '045/UND-ACR/IX/2026',
    perihal: 'Undangan Kegiatan Seminar & Workshop',
    salamPembuka: 'Dengan hormat,',
    isiSurat: 'Sehubungan dengan akan dilaksanakannya agenda tahunan, kami bermaksud mengundang Bapak/Ibu untuk dapat berhadir sebagai tamu undangan pada acara yang akan diselenggarakan.',
    salamPenutup: 'Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu berkenan hadir. Atas perhatiannya kami ucapkan terima kasih.',
  },
  kerja: {
    nama: 'Surat Keterangan Kerja',
    jenis: 'formal',
    nomorSurat: '108/SKK-HRD/IX/2026',
    perihal: 'Surat Keterangan Kerja',
    salamPembuka: 'Dengan hormat,',
    isiSurat: 'Yang bertanda tangan di bawah ini menerangkan bahwa nama yang bersangkutan adalah benar karyawan/staf aktif yang bekerja di instansi kami dengan kinerja yang baik.',
    salamPenutup: 'Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.',
  },
  ultah: {
    nama: 'Undangan Ulang Tahun (Non-Formal)',
    jenis: 'informal',
    nomorSurat: '-',
    perihal: 'Undangan Syukuran Ulang Tahun',
    salamPembuka: 'Halo Teman-teman!',
    isiSurat: 'Dalam rangka merayakan hari ulang tahunku yang ke-22, aku mau mengundang kalian semua untuk datang dan bersenang-senang bersama di acara makan malam dan syukuran kecil-kecilan.',
    salamPenutup: 'Kehadiran dan doa kalian adalah kado terindah buatku. Sampai ketemu di lokasi ya!',
  }
};

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('izin');
  const [logo, setLogo] = useState(null);
  
  const [formData, setFormData] = useState({
    kota: 'Banjarmasin',
    tanggal: new Date().toISOString().split('T')[0],
    instansi: 'Universitas Lambung Mangkurat',
    alamatInstansi: 'Jl. Ahmad Yani No. 12, Banjarmasin, Kalimantan Selatan',
    nomorSurat: TEMPLATES.izin.nomorSurat,
    perihal: TEMPLATES.izin.perihal,
    penerimaNama: 'Bapak/Ibu Pimpinan',
    penerimaJabatan: 'Kepala Bagian HRD',
    penerimaAlamat: 'Di Tempat',
    salamPembuka: TEMPLATES.izin.salamPembuka,
    pengirimNama: 'Pinguin Imut',
    pengirimIdentitas: '22101234567',
    pengirimJabatan: 'Mahasiswa / Pemohon',
    isiSurat: TEMPLATES.izin.isiSurat,
    salamPenutup: TEMPLATES.izin.salamPenutup,
    penandatangan: 'Pinguin Imut'
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

  const isInformal = TEMPLATES[selectedTemplate].jenis === 'informal';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans pb-12 print:bg-white print:p-0 print:pb-0">
      
      {/* Pengaturan Cetak A4 Presisi */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      {/* Navbar Header (Sembunyi saat dicetak) */}
      <header className="bg-slate-900 text-white p-4 shadow-md flex flex-wrap justify-between items-center px-6 gap-4 sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-400" />
          <div>
            <h1 className="text-lg font-bold leading-none">SuratCraft Pro</h1>
            <span className="text-[10px] text-slate-400">Multi-Template Generator</span>
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
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 max-w-[1600px] mx-auto w-full print:p-0 print:m-0 print:max-w-none">
        
        {/* PANEL KIRI: FORM CONFIGURATION (Sembunyi saat dicetak) */}
        <div className="w-full lg:w-5/12 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col gap-5 h-fit print:hidden">
          
          {/* Section 1: Template Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pilih Jenis Surat / Template</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(TEMPLATES).map((key) => (
                <button
                  key={key}
                  onClick={() => handleTemplateChange(key)}
                  className={`text-xs p-2.5 rounded-lg text-left border transition flex justify-between items-center ${
                    selectedTemplate === key
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{TEMPLATES[key].nama}</span>
                  {selectedTemplate === key && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2: Logo & Kop Surat */}
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
                className="w-full text-xs p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                name="alamatInstansi"
                placeholder="Alamat Lengkap / Kontak Instansi"
                value={formData.alamatInstansi}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3: Detail Lokasi & Penerima */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Lokasi, Tanggal & Penerima</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-[11px] text-slate-500">Kota Terbit</label>
                <input
                  type="text"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500">Tanggal Surat</label>
                <input
                  type="date"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
                />
              </div>
            </div>

            {!isInformal && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-[11px] text-slate-500">Nomor Surat</label>
                  <input
                    type="text"
                    name="nomorSurat"
                    value={formData.nomorSurat}
                    onChange={handleChange}
                    className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500">Perihal</label>
                  <input
                    type="text"
                    name="perihal"
                    value={formData.perihal}
                    onChange={handleChange}
                    className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 mt-3">
              <label className="block text-[11px] text-slate-500 font-semibold">Tujuan / Kepada Yth:</label>
              <input
                type="text"
                name="penerimaNama"
                placeholder="Nama / Pimpinan Tujuan"
                value={formData.penerimaNama}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
              />
              <input
                type="text"
                name="penerimaAlamat"
                placeholder="Alamat / Tempat"
                value={formData.penerimaAlamat}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4: Isi Surat */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Pengirim & Isi Surat</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                name="pengirimNama"
                placeholder="Nama Pengirim"
                value={formData.pengirimNama}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
              />
              <input
                type="text"
                name="pengirimIdentitas"
                placeholder="NIM / NIK / ID"
                value={formData.pengirimIdentitas}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <input
                type="text"
                name="salamPembuka"
                placeholder="Salam Pembuka"
                value={formData.salamPembuka}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
              />
              <textarea
                name="isiSurat"
                rows={4}
                placeholder="Isi Paragraf Utama Surat"
                value={formData.isiSurat}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none resize-none"
              />
              <textarea
                name="salamPenutup"
                rows={2}
                placeholder="Salam Penutup"
                value={formData.salamPenutup}
                onChange={handleChange}
                className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none resize-none"
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5: Penandatangan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Nama Penandatangan</label>
            <input
              type="text"
              name="penandatangan"
              value={formData.penandatangan}
              onChange={handleChange}
              className="w-full text-xs p-2 border border-slate-300 rounded-md outline-none"
            />
          </div>
        </div>

        {/* PANEL KANAN: LIVE PREVIEW DOKUMEN A4 */}
        <div className="w-full lg:w-7/12 flex flex-col items-center justify-start overflow-auto print:w-full print:block print:p-0 print:m-0">
          <div className="mb-3 text-xs text-slate-500 font-medium flex items-center gap-1.5 print:hidden">
            <Printer className="w-4 h-4 text-blue-600" /> Live Preview Layout A4
          </div>
          
          {/* Lembar A4 (Tinggi dikunci & Flex-col digunakan untuk mendorong Tanda Tangan ke pojok bawah) */}
          <div
            className={`bg-white shadow-xl p-10 w-[210mm] min-h-[297mm] text-slate-900 border border-slate-200 flex flex-col justify-between text-sm leading-relaxed print:shadow-none print:border-none print:w-full print:h-[275mm] print:p-0 ${
              isInformal ? 'font-sans' : 'font-serif'
            }`}
            style={{ fontFamily: isInformal ? 'Georgia, sans-serif' : 'Times New Roman, serif' }}
          >
            {/* Bagian Atas: Kop Surat, Informasi, & Isi Surat */}
            <div>
              {/* Header / Kop Surat */}
              <div className={`flex items-center gap-4 pb-3 mb-5 ${isInformal ? 'border-b-2 border-dashed border-pink-300 justify-center' : 'border-b-4 border-double border-black text-center'}`}>
                {logo && (
                  <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
                )}
                <div className={logo ? 'text-left flex-1' : 'w-full text-center'}>
                  <h2 className={`font-bold uppercase tracking-wider ${isInformal ? 'text-xl text-pink-600' : 'text-lg'}`}>
                    {formData.instansi || 'NAMA INSTANSI / PERUSAHAAN'}
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">{formData.alamatInstansi}</p>
                </div>
              </div>

              {/* Tanggal & Nomor */}
              <div className="flex justify-between items-start mb-5 text-sm">
                <div>
                  {!isInformal && (
                    <>
                      <p><span className="font-semibold">Nomor:</span> {formData.nomorSurat}</p>
                      <p><span className="font-semibold">Hal:</span> {formData.perihal}</p>
                    </>
                  )}
                </div>
                <div className="text-right">
                  <p>{formData.kota || 'Kota'}, {formData.tanggal}</p>
                </div>
              </div>

              {/* Penerima Surat (Kepada Yth) */}
              <div className="mb-5">
                <p>Kepada Yth,</p>
                <p className="font-semibold">{formData.penerimaNama}</p>
                <p>{formData.penerimaAlamat}</p>
              </div>

              {/* Isi Surat */}
              <div className="space-y-3">
                <p>{formData.salamPembuka}</p>
                
                <p className="text-justify leading-relaxed indent-8">
                  {formData.isiSurat}
                </p>

                {!isInformal && (
                  <div className="ml-6 my-3 space-y-1 text-sm bg-slate-50/50 p-2.5 rounded border border-slate-100">
                    <p><span className="w-36 inline-block font-medium">Nama</span>: {formData.pengirimNama}</p>
                    <p><span className="w-36 inline-block font-medium">NIM / NIK / ID</span>: {formData.pengirimIdentitas}</p>
                    <p><span className="w-36 inline-block font-medium">Jabatan / Status</span>: {formData.pengirimJabatan}</p>
                  </div>
                )}

                <p className="text-justify leading-relaxed">
                  {formData.salamPenutup}
                </p>
              </div>
            </div>

            {/* Bagian Bawah: Tanda Tangan (Terikat di Pojok Kanan Paling Bawah Kertas) */}
            <div className="flex justify-end mt-auto pt-6">
              <div className="text-center w-52">
                <p>{formData.kota}, {formData.tanggal}</p>
                <p className="mt-0.5 font-medium">{isInformal ? 'Salam Hangat,' : 'Hormat Saya,'}</p>
                <div className="h-20 flex items-center justify-center italic text-xs text-slate-300">
                  ( Tanda Tangan )
                </div>
                <p className="font-bold underline">{formData.penandatangan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}